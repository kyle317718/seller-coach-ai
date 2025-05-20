import { CoupangIcon, NaverIcon, ElevenIcon } from '@/components/icons';
import { PlatformData } from '@/types/platform';

export const PLATFORMS: PlatformData[] = [
  {
    key: 'coupang',
    name: '쿠팡',
    icon: CoupangIcon,
    guide: {
      name: '쿠팡 입점 가이드',
      fees: {
        commission: '10-15%',
        delivery: '3,000원~5,000원',
        other: '광고비 (선택사항)'
      },
      requirements: [
        '사업자등록증',
        '통신판매업신고증',
        '상품 이미지 최소 3장',
        '상세 페이지 제작'
      ],
      customs: [
        '로켓배송 가능 여부 확인',
        '반품/교환 정책 설정',
        '상품 카테고리 선택'
      ],
      documents: [
        '입점신청서',
        '상품등록양식',
        '계약서'
      ],
      timeline: [
        {
          step: '입점 신청',
          duration: '1-2일'
        },
        {
          step: '서류 심사',
          duration: '3-5일'
        },
        {
          step: '계약 체결',
          duration: '1-2일'
        },
        {
          step: '상품 등록',
          duration: '1-3일'
        }
      ]
    }
  },
  {
    key: 'naver',
    name: '네이버',
    icon: NaverIcon,
    guide: {
      name: '네이버 스마트스토어 입점 가이드',
      fees: {
        commission: '2-3%',
        delivery: '기본 2,500원',
        other: '광고비, 결제수수료'
      },
      requirements: [
        '사업자등록증',
        '통신판매업신고증',
        '정산계좌 인증',
        '본인인증'
      ],
      customs: [
        '상품 노출 최적화',
        '검색태그 설정',
        '가격비교 설정'
      ],
      documents: [
        '스토어 기본정보',
        '판매자 정보',
        '정산정보'
      ],
      timeline: [
        {
          step: '스토어 개설',
          duration: '즉시'
        },
        {
          step: '서류 등록',
          duration: '1-2일'
        },
        {
          step: '상품 등록',
          duration: '1일'
        }
      ]
    }
  },
  {
    key: 'eleven',
    name: '11번가',
    icon: ElevenIcon,
    guide: {
      name: '11번가 입점 가이드',
      fees: {
        commission: '8-12%',
        delivery: '2,500원~4,000원'
      },
      requirements: [
        '사업자등록증',
        '통신판매업신고증',
        '상품 이미지',
        '판매자 정보'
      ],
      customs: [
        'SK페이 설정',
        '상품평 관리',
        '프로모션 참여'
      ],
      documents: [
        '입점신청서',
        '판매자확인서',
        '계약서'
      ],
      timeline: [
        {
          step: '입점 신청',
          duration: '1일'
        },
        {
          step: '서류 심사',
          duration: '2-3일'
        },
        {
          step: '계약 체결',
          duration: '1일'
        },
        {
          step: '상품 등록',
          duration: '1-2일'
        }
      ]
    }
  }
]; 