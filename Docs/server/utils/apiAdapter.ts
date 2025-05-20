interface APIResponse {
    market_size: {
        value: string;
        growth_rate: string;
        source: string;
    };
    competitors: Array<{
        name: string;
        market_share: string;
        strengths: string[];
    }>;
    recommendations: string[];
    target_market: {
        size: string;
        demographics: string[];
        trends: string[];
    };
    timestamp: string;
}

interface AdaptedAnalysisResult {
    summary: string;
    marketSize: {
        value: string;
        growthRate: string;
        source: string;
    };
    competition: {
        level: string;
        competitors: Array<{
            name: string;
            marketShare: string;
            strengths: string[];
        }>;
    };
    recommendations: Array<{
        title: string;
        actions: string[];
    }>;
    targetMarket: {
        size: string;
        demographics: string[];
        trends: string[];
    };
}

export function adaptAnalysisData(apiData: APIResponse): AdaptedAnalysisResult {
    // 시장 규모 기반으로 요약 생성
    const summary = `${apiData.market_size.value} 시장 ${apiData.market_size.growth_rate} 성장 중`;

    // 경쟁사 수와 점유율 기반으로 경쟁 수준 결정
    const totalShare = apiData.competitors.reduce(
        (sum, comp) => sum + parseInt(comp.market_share),
        0
    );
    const competitionLevel = totalShare > 70 ? "높음" : totalShare > 40 ? "중간" : "낮음";

    return {
        summary,
        marketSize: {
            value: apiData.market_size.value,
            growthRate: apiData.market_size.growth_rate,
            source: apiData.market_size.source
        },
        competition: {
            level: competitionLevel,
            competitors: apiData.competitors.map(comp => ({
                name: comp.name,
                marketShare: comp.market_share,
                strengths: comp.strengths
            }))
        },
        recommendations: [
            {
                title: "마케팅 전략",
                actions: apiData.recommendations.filter(rec =>
                    rec.includes("마케팅") || rec.includes("홍보") || rec.includes("광고")
                )
            },
            {
                title: "가격 전략",
                actions: apiData.recommendations.filter(rec =>
                    rec.includes("가격") || rec.includes("할인") || rec.includes("프로모션")
                )
            }
        ],
        targetMarket: {
            size: apiData.target_market.size,
            demographics: apiData.target_market.demographics,
            trends: apiData.target_market.trends
        }
    };
} 