const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 5002;

// 정적 파일 서빙 설정 추가
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우트 수정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// DeepSeek API 설정
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// 마크다운 기호 제거 함수
function removeMarkdownSymbols(text) {
  if (!text) return text;
  
  // 모든 마크다운 기호 제거
  return text
    .replace(/#{1,6}\s+/g, '') // 헤더
    .replace(/\*\*/g, '')      // 볼드체
    .replace(/\*/g, '')        // 이탤릭체
    .replace(/`{1,3}/g, '')    // 코드 블록
    .replace(/\n\s*[-+*]\s+/g, '\n') // 리스트
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 링크
    .replace(/!\[([^\]]+)\]\([^\)]+\)/g, '$1') // 이미지
    .replace(/\n{3,}/g, '\n\n') // 여러 줄 바꿈을 2줄로
    .replace(/\s{2,}/g, ' ')   // 여러 공백을 하나로
    .replace(/^>+\s*/gm, '')   // 인용구
    .replace(/~~(.*?)~~/g, '$1'); // 취소선
}

// CORS 설정
app.use(cors({
  origin: '*', // 모든 도메인에서 접근 허용
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 미들웨어 설정
app.use(express.json({ limit: '50mb' }));

// axios 기본 설정
axios.defaults.timeout = 120000;  // 타임아웃을 120초(2분)로 설정

// 요청 로깅
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// DeepSeek API 호출 함수
async function analyzeWithDeepSeek(title, description) {
  const prompt = `다음 상품에 대해 전문적인 셀러 코치의 관점에서 8단계로 분석해주세요:

제품: ${title}

상품 설명: ${description}

다음 8단계로 분석 결과를 제공해주세요:

[1단계] 시장성 분석
- 대한민국 시장 매출 규모
- 성장 가능성
- 트렌드 반영도

[2단계] 고객 분석
- 타겟 고객층 정의
- 주요 사용 시나리오
- 핵심 고객 인사이트

[3단계] 상세페이지 개선
- 핵심 문구 제안
- 이미지 구성 전략
- 필수 구성요소

[4단계] 경쟁 분석
- 시장 경쟁 강도
- 차별화 포인트
- 잠재적 리스크

[5단계] 마케팅 전략
- 추천 마케팅 콘텐츠
- 핵심 키워드 목록
- 효과적인 마케팅 채널

[6단계] 판매 전 준비사항
- 필요한 인증/허가
- 물류 및 CS 준비
- 체크리스트

[7단계] 사입/위탁 제안
- 추천 공급처 유형
- 위탁 파트너 기준
- 예상 수익률 구조

[8단계] 상품 성장 예측
- 시장 성장 전망
- 계절성 분석
- 리스크 대응 전략

각 단계별로 실용적이고 구체적인 인사이트를 제공해주세요.`;

  const response = await axios.post(
    DEEPSEEK_API_URL,
    {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "당신은 전문적인 이커머스 셀러 코치입니다. 상품의 시장성과 판매 전략을 분석하여 실용적이고 구체적인 조언을 제공합니다. 각 단계별로 명확하게 구분하여 응답하세요."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500,
      top_p: 0.9
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      }
    }
  );
  
  return response.data.choices[0].message.content;
}

// 상품 분석 엔드포인트
app.post('/api/analyze-product', async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log('상품 분석 요청:', req.body);

    if (!DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY가 설정되지 않았습니다.');
      return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
    }

    const prompt = `다음 상품에 대해 마케팅 전문가의 관점에서 분석해주세요:

제품: ${title}

분석 요청: ${description}

다음 형식으로 분석 결과를 제공해주세요:

📊 시장 분석
- 판매량 추이 및 트렌드
- 주요 판매 플랫폼별 가격대
- 경쟁 상품 비교 분석

💡 판매 전략
- 주요 타겟 고객층
- 효과적인 마케팅 포인트
- 플랫폼별 판매 전략

📈 개선 제안
- 상세페이지 최적화 방안
- 핵심 키워드 추천
- 차별화 전략

🇰🇷 대한민국 시장 매출 규모
- 연간 시장 규모 추정
- 성장 가능성
- 주요 경쟁사 시장 점유율

✅ 판매 전 준비 내용
- 필수 확인 사항
- 이커머스 플랫폼별 준비물
- 마케팅 전략 수립 단계

위 항목들을 구체적이고 실용적인 인사이트를 바탕으로 분석해주세요.`;
    
    console.log('DeepSeek API 요청 시작:', new Date().toISOString());
    const response = await axios.post(DEEPSEEK_API_URL, {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '당신은 전문적인 이커머스 마케팅 전문가입니다. 상품의 시장성과 판매 전략을 분석하여 실용적이고 구체적인 조언을 제공합니다. 마크다운 기호를 사용하지 말고 일반 텍스트로만 응답하세요.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500,
      top_p: 0.9
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 120000
    });
    console.log('DeepSeek API 응답 완료:', new Date().toISOString());

    if (response.data?.choices?.[0]?.message?.content) {
      // 마크다운 기호 제거 후 응답
      const cleanedContent = removeMarkdownSymbols(response.data.choices[0].message.content);
      res.json({ result: cleanedContent });
    } else {
      console.error('DeepSeek API 응답 형식 오류:', response.data);
      res.status(500).json({ error: 'API 응답 형식이 올바르지 않습니다.' });
    }
  } catch (error) {
    console.error('상품 분석 에러:', error);
    console.error('에러 상세 정보:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    res.status(500).json({ 
      error: error.message || '상품 분석 중 오류가 발생했습니다.',
      details: error.response?.data
    });
  }
});

// SQLite 데이터베이스 설정
const dbPath = path.join(__dirname, 'feedback.db');

// 데이터베이스 연결
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err.message);
  } else {
    console.log('피드백 데이터베이스에 연결되었습니다.');
    
    // 피드백 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      page TEXT,
      user_agent TEXT
    )`, (err) => {
      if (err) {
        console.error('테이블 생성 오류:', err.message);
      } else {
        console.log('피드백 테이블이 준비되었습니다.');
      }
    });
  }
});

// 피드백 API 엔드포인트
app.post('/feedback', (req, res) => {
  try {
    const { content, timestamp, page, user_agent } = req.body;
    
    // 필수 필드 검증
    if (!content || !content.trim()) {
      return res.status(400).json({ 
        status: 'error',
        error: '피드백 내용은 필수입니다.' 
      });
    }
    
    console.log(`${new Date().toISOString()} - 피드백 수신: ${content.substring(0, 30)}...`);
    
    // 데이터베이스에 피드백 저장
    const stmt = db.prepare(`
      INSERT INTO feedback (content, timestamp, page, user_agent) 
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run(
      content, 
      timestamp || new Date().toISOString(), 
      page || 'unknown', 
      user_agent || 'unknown',
      function(err) {
        if (err) {
          console.error('피드백 저장 오류:', err.message);
          return res.status(500).json({ 
            status: 'error',
            error: '피드백 저장 중 오류가 발생했습니다.' 
          });
        }
        
        console.log(`피드백이 저장되었습니다. ID: ${this.lastID}`);
        res.status(201).json({ 
          status: 'success',
          message: '피드백이 성공적으로 저장되었습니다.',
          id: this.lastID
        });
      }
    );
    
    stmt.finalize();
    
  } catch (error) {
    console.error('피드백 처리 오류:', error);
    res.status(500).json({ 
      status: 'error',
      error: error.message || '피드백 처리 중 오류가 발생했습니다.' 
    });
  }
});

// 통합 MCP 엔드포인트
app.post('/mcp', async (req, res) => {
  try {
    console.log('MCP 요청 수신:', new Date().toISOString());
    const hasImageData = req.body.image_data ? 'O' : 'X';
    console.log(`요청 데이터: 이미지=${hasImageData}, 컨텍스트=${req.body.context?.length || 0}개`);
    
    // 컨텍스트를 이미지 포함하도록 수정
    let context = req.body.context || [];
    
    // 시스템 메시지를 항상 첫 번째로 추가 (마크다운 사용 금지 지시 포함)
    if (context.length > 0 && context[0].role !== 'system') {
      context.unshift({
        role: 'system',
        content: '당신은 전문적인 판매자 코치입니다. 마크다운 기호(#, *, ->, => 등)를 사용하지 말고 일반 텍스트로만 응답하세요. 각 항목에 대해 자세하고 구체적인 인사이트를 제공해주세요.'
      });
    } else if (context.length === 0) {
      context.push({
        role: 'system',
        content: '당신은 전문적인 판매자 코치입니다. 마크다운 기호(#, *, ->, => 등)를 사용하지 말고 일반 텍스트로만 응답하세요. 각 항목에 대해 자세하고 구체적인 인사이트를 제공해주세요.'
      });
    } else if (context[0].role === 'system') {
      // 기존 시스템 메시지에 마크다운 사용 금지 지시 추가
      if (!context[0].content.includes('마크다운 기호')) {
        context[0].content += ' 마크다운 기호(#, *, ->, => 등)를 사용하지 말고 일반 텍스트로만 응답하세요. 각 항목에 대해 자세하고 구체적인 인사이트를 제공해주세요.';
      }
    }
    
    // 이미지가 있으면 컨텍스트에 추가
    if (req.body.image_data) {
      // 첫 번째 유저 메시지를 찾기
      const userMsgIndex = context.findIndex(msg => msg.role === 'user');
      
      if (userMsgIndex !== -1) {
        // 기존 유저 메시지에 이미지 태그 추가
        context[userMsgIndex].content = 
          `<img src="${req.body.image_data}">\n\n${context[userMsgIndex].content}`;
      }
    }
    
    console.log('DeepSeek API 요청 시작:', new Date().toISOString());
    const response = await axios.post(DEEPSEEK_API_URL, {
      model: 'deepseek-chat',
      messages: context,
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 2500
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      timeout: 120000 // 타임아웃 1분으로 유지
    });
    console.log('DeepSeek API 응답 완료:', new Date().toISOString());

    if (response.data && response.data.choices && response.data.choices[0].message) {
      // 마크다운 기호 제거
      let result = response.data.choices[0].message.content;
      
      // 마크다운 헤더 기호 제거 (####, ### 등)
      result = result.replace(/#{1,6}\s+/g, '');
      
      // 볼드체와 이탤릭체 기호 제거 (**, *)
      result = result.replace(/\*\*/g, '');
      result = result.replace(/\*/g, '');
      
      // 화살표 기호 제거 (->)
      result = result.replace(/->/g, '');
      result = result.replace(/=>/g, '');
      
      res.json({
        status: 'success',
        result: result
      });
    } else {
      console.error('DeepSeek API 응답 형식 오류:', response.data);
      res.status(500).json({ 
        status: 'error',
        error: 'API 응답 형식이 올바르지 않습니다.' 
      });
    }
  } catch (error) {
    console.error('MCP 오류:', error);
    res.status(500).json({ 
      status: 'error',
      error: error.message || 'MCP 처리 중 오류가 발생했습니다.' 
    });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
  console.log('환경 변수:');
  console.log(`DEEPSEEK_API_KEY: ${process.env.DEEPSEEK_API_KEY ? '설정됨' : '설정되지 않음'}`);
});
