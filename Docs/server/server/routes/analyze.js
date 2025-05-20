const express = require('express');
const router = express.Router();
const axios = require('axios');

// 분석 유형별 프롬프트 템플릿
const getAnalysisPrompt = (data, analysisType) => {
    const baseInfo = `
제품명: ${data.productName}
카테고리: ${data.category} > ${data.subcategory}
가격대: ${data.priceRange}
타겟 시장: ${data.targetMarket}
`;

    const prompts = {
        market: `
다음 제품의 시장 분석을 진행해주세요:
${baseInfo}

다음 항목들에 대해 자세히 분석해주세요:
1. 전체 시장 규모 (TAM)
2. 실질적 시장 규모 (SAM)
3. 시장 성장률
4. 시장 진입 장벽
5. 향후 3년 시장 전망

응답은 JSON 형식으로 다음 구조를 따라주세요:
{
    "marketSize": "전체 시장 규모 분석",
    "addressableMarket": "실질적 시장 규모 분석",
    "growthRate": "시장 성장률 분석",
    "entryBarriers": "시장 진입 장벽 분석",
    "forecast": "향후 전망"
}`,

        competition: `
다음 제품의 경쟁 분석을 진행해주세요:
${baseInfo}

다음 항목들에 대해 자세히 분석해주세요:
1. 주요 경쟁사 현황
2. 경쟁사 제품 특징
3. 경쟁 강도
4. 차별화 포인트
5. SWOT 분석

응답은 JSON 형식으로 다음 구조를 따라주세요:
{
    "competitors": ["경쟁사1", "경쟁사2", "경쟁사3"],
    "competitorFeatures": "경쟁사 제품 특징 분석",
    "competitionIntensity": "경쟁 강도 분석",
    "differentiationPoints": ["차별화 포인트1", "차별화 포인트2"],
    "swotAnalysis": {
        "strengths": ["강점1", "강점2"],
        "weaknesses": ["약점1", "약점2"],
        "opportunities": ["기회1", "기회2"],
        "threats": ["위협1", "위협2"]
    }
}`,

        pricing: `
다음 제품의 가격 전략 분석을 진행해주세요:
${baseInfo}

다음 항목들에 대해 자세히 분석해주세요:
1. 적정 가격대 분석
2. 가격 전략 추천
3. 수익성 분석
4. 가격 민감도
5. 프로모션 전략

응답은 JSON 형식으로 다음 구조를 따라주세요:
{
    "optimalPriceRange": "적정 가격대 분석",
    "pricingStrategy": "추천 가격 전략",
    "profitabilityAnalysis": "수익성 분석",
    "priceSensitivity": "가격 민감도 분석",
    "promotionStrategy": ["프로모션 전략1", "프로모션 전략2"]
}`,

        trend: `
다음 제품의 트렌드 분석을 진행해주세요:
${baseInfo}

다음 항목들에 대해 자세히 분석해주세요:
1. 현재 시장 트렌드
2. 소비자 선호도 변화
3. 기술 트렌드
4. 향후 트렌드 예측
5. 대응 전략

응답은 JSON 형식으로 다음 구조를 따라주세요:
{
    "currentTrends": ["트렌드1", "트렌드2"],
    "consumerPreferences": "소비자 선호도 분석",
    "techTrends": "기술 트렌드 분석",
    "futureTrends": ["예측1", "예측2"],
    "strategies": ["대응 전략1", "대응 전략2"]
}`
    };

    return prompts[analysisType] || prompts.market;
};

router.post('/:analysisType?', async (req, res) => {
    try {
        const { productName, category, subcategory, priceRange, targetMarket } = req.body;
        const analysisType = req.params.analysisType || 'market';

        // 입력 유효성 검사
        if (!productName || !category || !priceRange || !targetMarket) {
            return res.status(400).json({
                success: false,
                message: '필수 입력 항목이 누락되었습니다.'
            });
        }

        if (!process.env.DEEPSEEK_API_KEY) {
            throw new Error('DeepSeek API 키가 설정되지 않았습니다.');
        }

        // 진행 상태 전송을 위한 헤더 설정
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'chunked'
        });

        // DeepSeek API 요청
        const response = await axios.post(
            'https://api.deepseek.com/v1/chat/completions',
            {
                messages: [
                    {
                        role: "system",
                        content: "당신은 전문적인 제품 분석가입니다. 제품의 시장성, 경쟁력, 가격 전략을 분석하고 구체적인 조언을 제공합니다."
                    },
                    {
                        role: "user",
                        content: getAnalysisPrompt(req.body, analysisType)
                    }
                ],
                response_format: { type: "json_object" },
                temperature: 0.7,
                max_tokens: 2000
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // API 응답 파싱
        const analysisResult = JSON.parse(response.data.choices[0].message.content);

        // 분석 결과에 입력 정보 추가
        const result = {
            productName,
            category,
            subcategory,
            priceRange,
            targetMarket,
            analysisType,
            analysis: analysisResult
        };

        // 최종 응답
        res.end(JSON.stringify({
            success: true,
            result
        }));

    } catch (error) {
        console.error('Analysis error:', error);

        // 이미 헤더를 보냈는지 확인
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: '분석 중 오류가 발생했습니다.',
                error: error.message
            });
        } else {
            res.end(JSON.stringify({
                success: false,
                message: '분석 중 오류가 발생했습니다.',
                error: error.message
            }));
        }
    }
});

module.exports = router; 