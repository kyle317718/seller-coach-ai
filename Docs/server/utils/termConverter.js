export const convertTerms = (text, isBeginnerMode) => {
  if (!isBeginnerMode) return text;

  const termMap = {
    "CPC": "광고 클릭 비용",
    "ROAS": "광고 수익률",
    "CTR": "클릭률",
    "MAU": "월간 사용자 수",
    "B2C": "소비자 직접 판매",
    "ROI": "투자 수익률",
    "KPI": "핵심 성과 지표",
    "SEO": "검색엔진 최적화"
  };

  const pattern = new RegExp(Object.keys(termMap).join('|'), 'g');
  return text.replace(pattern, match => termMap[match] || match);
}; 