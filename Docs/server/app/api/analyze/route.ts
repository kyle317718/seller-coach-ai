import { NextResponse } from 'next/server';
import { processAnalysisData } from '@/utils/analysisProcessor';
import { AnalysisRequest } from '@/types/analysis';

// API 설정
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb'
        },
        responseLimit: '5mb'
    }
};

// 분석 요청 추적
const trackAnalysisRequest = async (productName: string, category: string) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 분석 요청:`, { productName, category });
    // TODO: 실제 모니터링 시스템 연동
};

export async function POST(request: Request) {
    try {
        // 1. JSON 요청 처리
        const data: AnalysisRequest = await request.json();

        // 2. 입력값 검증
        if (!data.productName || !data.category) {
            return NextResponse.json(
                { error: "상품명과 카테고리는 필수 입력값입니다." },
                { status: 400 }
            );
        }

        // 3. 요청 추적
        await trackAnalysisRequest(data.productName, data.category);

        // 4. 데이터 처리
        const analysisResult = await processAnalysisData(data);

        // 5. 응답 반환
        return NextResponse.json(analysisResult);

    } catch (error) {
        console.error('Analysis API Error:', error);

        // 6. 에러 처리
        const errorMessage = error instanceof Error ? error.message : "분석 처리 중 오류가 발생했습니다.";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
} 