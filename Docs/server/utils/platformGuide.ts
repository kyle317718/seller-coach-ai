import { Language } from './i18n';

export type PlatformKey = 'coupang' | 'naver' | 'eleven';

export interface PlatformRequirement {
  name: string;
  fee: string;
  requirements: string[];
  customs: string[];
  documents: string[];
  timeline: string;
}

export interface PlatformGuide {
  [key: string]: {
    ko: PlatformRequirement;
    zh: PlatformRequirement;
  };
}

export const PLATFORM_GUIDES: PlatformGuide = {
  ko: {
    coupang: {
      name: '쿠팡',
      fee: '카테고리별 차등 수수료 (10~15%)',
      requirements: [
        '사업자등록증',
        '통신판매업 신고증',
        '계좌 정보',
        '담당자 연락처'
      ],
      customs: [
        'KC 인증 필수 품목: 전기용품, 생활용품, 어린이제품',
        '식품의 경우 HACCP 인증 필요',
        '화장품의 경우 KFDA 인증 필요'
      ],
      documents: [
        '수출신고필증',
        '원산지증명서',
        '품목별 안전인증서'
      ],
      timeline: '서류 심사 2-3일 + 입점 승인 1-2일'
    },
    naver: {
      name: '스마트스토어',
      fee: '기본 수수료 3% + 결제 수수료 3%',
      requirements: [
        '사업자등록증',
        '통신판매업 신고증',
        '네이버 계정',
        '정산 계좌'
      ],
      customs: [
        'KC 인증 대상 품목 확인',
        '식품의 경우 수입신고 확인증 필요',
        '의류/잡화의 경우 원산지 표시 필수'
      ],
      documents: [
        '사업자등록증 사본',
        '신분증 사본',
        '통장 사본'
      ],
      timeline: '서류 접수 즉시 + 심사 1-2일'
    },
    eleven: {
      name: '11번가',
      fee: '카테고리별 차등 수수료 (9~13%)',
      requirements: [
        '사업자등록증',
        '통신판매업 신고증',
        '정산 계좌',
        '담당자 정보'
      ],
      customs: [
        'KC 인증 필수 확인',
        '식품/화장품의 경우 추가 인증 필요',
        '상품별 원산지 표시 의무'
      ],
      documents: [
        '사업자등록증 사본',
        '통신판매업 신고증 사본',
        '신분증 사본'
      ],
      timeline: '서류 검토 2일 + 승인 1-2일'
    }
  },
  zh: {
    coupang: {
      name: 'Coupang',
      fee: '按类目收取差异化费用 (10~15%)',
      requirements: [
        '营业执照',
        '电商经营许可证',
        '账户信息',
        '负责人联系方式'
      ],
      customs: [
        'KC认证必需品：电器用品、生活用品、儿童用品',
        '食品需要HACCP认证',
        '化妆品需要KFDA认证'
      ],
      documents: [
        '出口申报单',
        '原产地证明',
        '商品安全认证书'
      ],
      timeline: '文件审核2-3天 + 入驻审批1-2天'
    },
    naver: {
      name: 'SmartStore',
      fee: '基础费用3% + 支付手续费3%',
      requirements: [
        '营业执照',
        '电商经营许可证',
        'NAVER账号',
        '结算账户'
      ],
      customs: [
        '确认KC认证对象品类',
        '食品需要进口申报确认证',
        '服装/杂货需标注原产地'
      ],
      documents: [
        '营业执照复印件',
        '身份证复印件',
        '存折复印件'
      ],
      timeline: '文件接收即时 + 审核1-2天'
    },
    eleven: {
      name: '11街',
      fee: '按类目收取差异化费用 (9~13%)',
      requirements: [
        '营业执照',
        '电商经营许可证',
        '结算账户',
        '负责人信息'
      ],
      customs: [
        '确认KC认证必需',
        '食品/化妆品需要额外认证',
        '商品原产地标注义务'
      ],
      documents: [
        '营业执照复印件',
        '电商经营许可证复印件',
        '身份证复印件'
      ],
      timeline: '文件审核2天 + 审批1-2天'
    }
  }
};

export function getPlatformGuide(platform: string, lang: Language): PlatformRequirement {
  return PLATFORM_GUIDES[platform][lang];
}

export function recommendPlatform(category: string, lang: Language): PlatformKey[] {
  // Simple recommendation logic based on category
  if (category.includes('식품') || category.includes('食品')) {
    return ['coupang', 'naver'];
  } else if (category.includes('의류') || category.includes('服装')) {
    return ['naver', 'eleven'];
  } else if (category.includes('전자') || category.includes('电子')) {
    return ['coupang', 'eleven'];
  } else if (category.includes('반려') || category.includes('반려동물')) {
    return ['naver', 'coupang']; // 반려동물 용품은 네이버와 쿠팡이 강세
  }
  return ['coupang', 'naver', 'eleven'];
} 