export type Language = 'ko' | 'zh';

export const translations = {
  ko: {
    // 공통
    "language": "한국어",
    "change_language": "언어 변경",
    
    // 메인 페이지
    "hero_title": "한국 온라인 시장 진출, AI가 한눈에 알려줍니다",
    "hero_subtitle": "중국어 → 한국어 실시간 번역 지원",
    "start_analysis": "무료 입점 분석 시작",
    "download_guide": "한국 플랫폼 가이드 PDF 받기",
    
    // 분석 카드
    "market_analysis": "한국 소비자 선호도 분석",
    "market_description": "한국 소비자들이 선호하는 중국 상품 TOP 10과 구매 결정 요인을 분석합니다.",
    "platform_guide": "플랫폼 입점 가이드",
    "platform_description": "쿠팡/스마트스토어 입점 절차와 필수 서류, 수수료 정보를 제공합니다.",
    "logistics_guide": "통관/배송 체크리스트",
    "logistics_description": "관세 신고서 작성 예시와 배송 방법별 비용을 비교 분석합니다.",
    "localization": "실시간 번역/현지화",
    "localization_description": "상품명과 상세 설명을 한국어로 자동 번역하고 현지화합니다.",
    
    // 메트릭 라벨
    "market_growth": "시장 성장률",
    "competition": "경쟁 강도",
    "margin": "예상 마진율",
    "entry_period": "입점 소요 기간",
    "required_docs": "필수 서류",
    "initial_cost": "초기 비용",
    "customs_period": "통관 소요일",
    "tariff_rate": "관세율",
    "shipping_cost": "배송비",
    "translation_accuracy": "번역 정확도",
    "processing_time": "처리 시간",
    "supported_languages": "지원 언어",
    
    // 상태
    "medium": "중간",
    "free": "무료",
    "lowest": "최저가",
    "realtime": "실시간",
    "ko_zh": "중/한"
  },
  zh: {
    // 共通
    "language": "中文",
    "change_language": "切换语言",
    
    // 主页
    "hero_title": "韩国线上市场进驻，AI一目了然",
    "hero_subtitle": "中文 → 韩文实时翻译支持",
    "start_analysis": "免费入驻分析",
    "download_guide": "下载韩国平台指南PDF",
    
    // 分析卡片
    "market_analysis": "韩国消费者偏好分析",
    "market_description": "分析韩国消费者最喜爱的中国商品TOP 10和购买决策因素。",
    "platform_guide": "平台入驻指南",
    "platform_description": "提供Coupang/SmartStore入驻流程、必要文件和手续费信息。",
    "logistics_guide": "通关/配送清单",
    "logistics_description": "提供报关单填写示例和各种配送方式的费用比较分析。",
    "localization": "实时翻译/本地化",
    "localization_description": "自动将商品名称和详细说明翻译成韩语并本地化。",
    
    // 指标标签
    "market_growth": "市场增长率",
    "competition": "竞争强度",
    "margin": "预期利润率",
    "entry_period": "入驻所需时间",
    "required_docs": "必要文件",
    "initial_cost": "初期费用",
    "customs_period": "通关时间",
    "tariff_rate": "关税率",
    "shipping_cost": "运费",
    "translation_accuracy": "翻译准确度",
    "processing_time": "处理时间",
    "supported_languages": "支持语言",
    
    // 状态
    "medium": "中等",
    "free": "免费",
    "lowest": "最低",
    "realtime": "实时",
    "ko_zh": "中/韩"
  }
} as const;

export type TranslationKey = keyof typeof translations.ko;

export function getTranslation(key: TranslationKey, lang: Language): string {
  return translations[lang][key] || translations.ko[key];
}

export const CURRENCY_SYMBOLS = {
  ko: '₩',
  zh: '¥'
} as const; 