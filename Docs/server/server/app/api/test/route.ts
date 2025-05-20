import { NextResponse } from 'next/server';
import { NaverShoppingAPI } from '../../../services/api/NaverShoppingAPI';
import { CoupangAPI } from '../../../services/api/CoupangAPI';
import { MockShoppingAPI } from '../../../services/api/MockShoppingAPI';

// API 키 확인
const hasNaverApiKey = process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET;
const hasCoupangApiKey = process.env.COUPANG_ACCESS_KEY && process.env.COUPANG_SECRET_KEY;

// API 초기화
const mockAPI = new MockShoppingAPI();
const naverAPI = hasNaverApiKey
    ? new NaverShoppingAPI(process.env.NAVER_CLIENT_ID!, process.env.NAVER_CLIENT_SECRET!)
    : mockAPI;
const coupangAPI = hasCoupangApiKey ? new CoupangAPI() : mockAPI;

// GET /api/test/naver?keyword=강아지자동급수기
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword');

    if (!keyword) {
        return NextResponse.json({ error: '검색어가 필요합니다' }, { status: 400 });
    }

    try {
        // 네이버 쇼핑 트렌드 테스트
        const naverResult = await naverAPI.getSearchTrend(keyword);

        // 쿠팡 상품 검색 테스트
        const coupangResult = await coupangAPI.searchProducts(keyword);

        return NextResponse.json({
            success: true,
            naver: {
                ...naverResult,
                isMock: !hasNaverApiKey
            },
            coupang: {
                ...coupangResult,
                isMock: !hasCoupangApiKey
            }
        });
    } catch (error) {
        console.error('API 테스트 에러:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다'
        }, { status: 500 });
    }
} 