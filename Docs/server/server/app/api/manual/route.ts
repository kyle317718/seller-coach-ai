import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const format = searchParams.get('format') || 'A4';
        const language = searchParams.get('language') || 'en';
        const includeVideos = searchParams.get('includeVideos') === 'true';

        // Create a PDF document
        const doc = new PDFDocument({
            size: format === 'A4' ? 'A4' : 'LETTER',
            margin: 50
        });

        // Set up response headers
        const headers = new Headers();
        headers.set('Content-Type', 'application/pdf');
        headers.set('Content-Disposition', 'attachment; filename=manual.pdf');

        // Create a buffer to store the PDF
        const chunks: Buffer[] = [];
        doc.on('data', chunk => chunks.push(chunk));

        // Add content to the PDF based on language
        const title = language === 'ko' ? '사용자 매뉴얼' : 'User Manual';
        doc.fontSize(24).text(title, { align: 'center' });
        doc.moveDown();

        // Add basic content
        const content = language === 'ko' ? {
            introduction: '소개',
            features: '주요 기능',
            usage: '사용 방법',
            videos: '비디오 튜토리얼'
        } : {
            introduction: 'Introduction',
            features: 'Features',
            usage: 'Usage Guide',
            videos: 'Video Tutorials'
        };

        doc.fontSize(16).text(content.introduction);
        doc.fontSize(12).text(language === 'ko' ?
            '이 매뉴얼은 제품의 기본 사용법을 설명합니다.' :
            'This manual explains the basic usage of the product.'
        );
        doc.moveDown();

        doc.fontSize(16).text(content.features);
        doc.fontSize(12).text(language === 'ko' ?
            '- 리스크 분석\n- 경쟁사 분석\n- 예산 시뮬레이터' :
            '- Risk Analysis\n- Competitor Analysis\n- Budget Simulator'
        );
        doc.moveDown();

        if (includeVideos) {
            doc.fontSize(16).text(content.videos);
            doc.fontSize(12).text(language === 'ko' ?
                '비디오 튜토리얼은 다음 링크에서 확인하실 수 있습니다:' :
                'Video tutorials can be accessed at:'
            );
            doc.fontSize(12).text('https://example.com/tutorials', {
                link: 'https://example.com/tutorials',
                underline: true,
                color: 'blue'
            });
        }

        // Finalize the PDF
        doc.end();

        // Wait for all chunks to be collected
        const pdfBuffer = Buffer.concat(chunks);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers
        });

    } catch (error) {
        console.error('Error generating manual:', error);
        return NextResponse.json(
            { error: 'Failed to generate manual' },
            { status: 500 }
        );
    }
} 