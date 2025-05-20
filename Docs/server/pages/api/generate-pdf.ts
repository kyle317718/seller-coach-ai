import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '허용되지 않는 메소드입니다.' });
    }

    try {
        const { steps } = req.body;

        // PDF 생성
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50,
            info: {
                Title: '셀러코치.AI 분석 결과',
                Author: '셀러코치.AI',
            },
        });

        // 스트림 설정
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=analysis-result.pdf');
        doc.pipe(res);

        // 제목 추가
        doc.font('Helvetica-Bold')
            .fontSize(24)
            .text('셀러코치.AI 분석 결과', { align: 'center' });

        doc.moveDown(2);

        // 각 단계별 내용 추가
        steps.forEach((step: any, index: number) => {
            // 단계 제목
            doc.font('Helvetica-Bold')
                .fontSize(16)
                .text(`${index + 1}. ${step.title}`);

            doc.moveDown(0.5);

            // 단계 내용
            doc.font('Helvetica')
                .fontSize(12)
                .text(step.content);

            doc.moveDown(1.5);
        });

        // PDF 생성 완료
        doc.end();
    } catch (error) {
        console.error('PDF 생성 중 오류:', error);
        res.status(500).json({ error: 'PDF 생성에 실패했습니다.' });
    }
} 