import { NextResponse } from 'next/server';
import { NaverShoppingAPI } from '../../../services/api/NaverShoppingAPI';
import { CoupangAPI } from '../../../services/api/CoupangAPI';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const naverAPI = new NaverShoppingAPI();
const coupangAPI = new CoupangAPI();

export async function POST(req: Request) {
    try {
        const { productName, keyword } = await req.json();

        // 1. 네이버 쇼핑 트렌드 데이터 가져오기
        const searchTrend = await naverAPI.getSearchTrend(keyword);

        // 2. 쿠팡 경쟁사 데이터 가져오기
        const competitors = await coupangAPI.searchProducts(keyword);

        // 3. 데이터베이스에 분석 결과 저장
        const analysis = await prisma.productAnalysis.create({
            data: {
                productName,
                keyword,
                searchTrend,
                competitors,
                marketSize: 1000000000000, // 1조원 (실제로는 API에서 가져와야 함)
                marketGrowth: 15.5,
                marketShare: 2.5,
                priceRange: { min: 10000, max: 50000 },
                targetMarket: ['반려동물 가구', '펫테크'],
                riskScore: 75.5,
                recommendations: [
                    '경쟁사 대비 차별화된 마케팅 전략 수립 필요',
                    '품질 관리 프로세스 강화로 반품률 감소 도모',
                    '성장하는 시장에 맞춘 공격적 마케팅 전략 권장'
                ]
            }
        });

        return NextResponse.json({
            success: true,
            data: analysis
        });
    } catch (error) {
        console.error('Analysis API Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to perform analysis'
        }, { status: 500 });
    }
} 