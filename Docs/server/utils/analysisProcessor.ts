import { DeepSeekResponse, ProcessedAnalysis } from '@/types/analysis';

export const processAnalysisData = async (rawData: any): Promise<ProcessedAnalysis> => {
    // 1. JSON 요청 데이터 정규화
    const normalizedData = normalizeRequestData(rawData);

    // 2. DeepSeek 분석 결과 처리
    const analysisResult = await processDeepSeekAnalysis(normalizedData);

    // 3. 표준화된 응답 생성
    return standardizeResponse(analysisResult);
};

const normalizeRequestData = (rawData: any) => {
    const { productName, category, priceRange, targetMarket } = rawData;
    return {
        product_info: {
            name: productName,
            category: category,
            price_range: priceRange,
            target_market: targetMarket
        },
        timestamp: new Date().toISOString()
    };
};

const processDeepSeekAnalysis = async (normalizedData: any): Promise<DeepSeekResponse> => {
    try {
        // DeepSeek 분석 결과 처리 로직
        const marketSize = await calculateMarketSize(normalizedData.product_info.category);
        const competitors = await analyzeCompetitors(normalizedData.product_info);
        const recommendations = generateRecommendations(marketSize, competitors);

        return {
            market_analysis: {
                size: marketSize,
                growth_rate: "25%",
                source: "한국펫산업협회 2024"
            },
            competitors: competitors,
            recommendations: recommendations
        };
    } catch (error) {
        console.error('DeepSeek 분석 오류:', error);
        throw new Error('분석 처리 중 오류가 발생했습니다.');
    }
};

const calculateMarketSize = async (category: string): Promise<string> => {
    // 실제로는 외부 API나 DB 조회가 필요
    const marketSizes: { [key: string]: string } = {
        '펫용품': '1조 2,000억원',
        '생활용품': '8,000억원',
        '전자기기': '2조 5,000억원'
    };
    return marketSizes[category] || '시장 규모 데이터 없음';
};

const analyzeCompetitors = async (productInfo: any) => {
    return [
        {
            name: "A사",
            market_share: "35%",
            threat_level: "high",
            strengths: ["브랜드 인지도", "유통망 다양성"]
        },
        {
            name: "B사",
            market_share: "25%",
            threat_level: "medium",
            strengths: ["가격 경쟁력", "제품 다양성"]
        }
    ];
};

const generateRecommendations = (marketSize: string, competitors: any[]) => {
    const totalMarketShare = competitors.reduce(
        (sum, comp) => sum + parseInt(comp.market_share),
        0
    );

    const recommendations = [];

    // 시장 진입 전략
    if (totalMarketShare < 70) {
        recommendations.push("시장 진입 기회 높음 - 적극적 마케팅 전략 권장");
    } else {
        recommendations.push("차별화 전략 필요 - 틈새시장 공략 권장");
    }

    // 마케팅 전략
    recommendations.push("인스타그램 월 70만원 마케팅 집중");

    // 가격 전략
    recommendations.push("경쟁사 대비 10~15% 낮은 가격대 책정");

    return recommendations;
};

const standardizeResponse = (analysisResult: DeepSeekResponse): ProcessedAnalysis => {
    return {
        summary: `${analysisResult.market_analysis.size} 시장 ${analysisResult.market_analysis.growth_rate} 성장 중`,
        market_size: {
            value: analysisResult.market_analysis.size,
            growth_rate: analysisResult.market_analysis.growth_rate,
            source: analysisResult.market_analysis.source
        },
        competitors: analysisResult.competitors.map(comp => ({
            name: comp.name,
            market_share: comp.market_share,
            strengths: comp.strengths
        })),
        recommendations: analysisResult.recommendations,
        timestamp: new Date().toISOString()
    };
}; 