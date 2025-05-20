export const MARKET_DATA = { tam: "1조 2,000억원", growthRate: 25 };
export const PRICE_DATA = { optimal: "49,000원", range: "35,000~65,000원" };
export const COMPETITOR_DATA = { main: "A사, B사, C사", level: "높음" };
export const TARGET_DATA = { main: "20~30대 여성", feature: "온라인 쇼핑 선호, 트렌드 민감" };
export const TREND_DATA = { trend: "친환경, 미니멀리즘", change: "최근 2년간 40% 증가" };
export const RISK_DATA = { main: "원자재 가격 변동, 공급망 불안", strategy: "다양한 공급처 확보, 가격 변동 모니터링" };
export const DETAIL_DATA = { key: "상세 이미지, 구매 후기, Q&A", improve: "고객 후기 강화, 상세 이미지 추가" };
export const MARKETING_DATA = { main: "SNS 인플루언서 마케팅, 검색광고", channel: "인스타그램, 네이버, 유튜브" };

export const analyzeProduct = (productInfo) => {
  console.log('[MockAPI] 분석 요청:', productInfo);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          market: MARKET_DATA,
          pricing: PRICE_DATA,
          competitor: COMPETITOR_DATA,
          target: TARGET_DATA,
          trend: TREND_DATA,
          risk: RISK_DATA,
          detailPage: DETAIL_DATA,
          marketing: MARKETING_DATA,
        },
      });
    }, 1000);
  });
};
