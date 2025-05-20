const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

dotenv.config();

// API 설정
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// 모델 설정
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
  },
});

const app = express();

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({
  limit: '50mb'
}));

// DeepSeek API 설정
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// 상품 분석 함수
async function analyzeProduct(title, description) {
  const prompt = `
다음 상품에 대해 전문적인 분석을 제공해주세요:

상품명: ${title || ''}
상품 설명: ${description || ''}

다음 형식으로 분석해주세요:
1. 상품 개요
2. 장점
3. 단점
4. 개선점
5. 마케팅 제안
`;

  try {
    // Gemini API 시도
    const chat = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (geminiError) {
    console.log('Gemini API 오류:', geminiError);
    
    try {
      // DeepSeek API로 폴백
      const deepseekResponse = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "당신은 전문적인 상품 분석가입니다. 상품명과 설명을 분석하여 장단점과 개선점을 제시해주세요."
            },
            {
              role: "user",
              content: `상품명: ${title}\n상품 설명: ${description}\n\n이 상품에 대해 분석해주세요.`
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
          }
        }
      );
      
      return deepseekResponse.data.choices[0].message.content;
    } catch (deepseekError) {
      console.log('DeepSeek API 오류:', deepseekError);
      throw new Error('모든 AI 서비스에 접근할 수 없습니다.');
    }
  }
}

// 상품 분석 라우트
app.post('/api/analyze-product', async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log('상품 분석 요청:', { title, description });

    if (!title || !description) {
      return res.status(400).json({
        error: '상품명과 설명을 모두 입력해주세요.'
      });
    }

    const analysisResult = await analyzeProduct(title, description);
    
    res.json({
      status: 'success',
      result: analysisResult
    });
  } catch (error) {
    console.error('상품 분석 오류:', error);
    res.status(500).json({ 
      error: '상품 분석 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
});

// MCP 라우트
app.post('/mcp', async (req, res) => {
  try {
    const { command, payload } = req.body;
    console.log('[MCP] 요청 받음:', { command, payload });

    if (command === 'analyze' && payload) {
      const analysisResult = await analyzeProduct(payload.title, payload.description);
      
      res.json({
        status: 'success',
        result: analysisResult
      });
    } else {
      res.status(400).json({ error: '알 수 없는 명령이거나 잘못된 데이터입니다.' });
    }
  } catch (error) {
    console.error('[MCP] 오류:', error);
    res.status(500).json({
      error: '내부 서버 오류',
      details: error.message
    });
  }
});

// 포트 설정
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log('환경 변수:');
  console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY ? '설정됨' : '설정되지 않음');
  console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? '설정됨' : '설정되지 않음');
  console.log('프론트엔드 URL:', process.env.FRONTEND_URL || 'http://localhost:3001');
});