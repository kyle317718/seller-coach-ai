import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export interface PDFGenerationOptions {
    filename?: string;
    resolution?: number;
    margin?: number;
}

const defaultOptions: Required<PDFGenerationOptions> = {
    filename: 'analysis-report.pdf',
    resolution: 300, // DPI
    margin: 10 // mm
};

export async function generatePDF(
    elementId: string,
    options: PDFGenerationOptions = {}
) {
    const { filename, resolution, margin } = { ...defaultOptions, ...options };

    try {
        // 고해상도 이미지 생성
        const image = await toPng(document.getElementById(elementId)!, {
            quality: 1.0,
            pixelRatio: resolution / 96, // convert DPI to pixel ratio
            cacheBust: true,
            canvasWidth: 2480, // A4 width at 300 DPI
            canvasHeight: 3508, // A4 height at 300 DPI
        });

        // PDF 생성
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // 이미지를 PDF에 추가
        const imgProps = pdf.getImageProperties(image);
        const pdfWidth = pdf.internal.pageSize.getWidth() - (margin * 2);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(image, 'PNG', margin, margin, pdfWidth, pdfHeight);
        pdf.save(filename);

        return true;
    } catch (error) {
        console.error('PDF 생성 중 오류 발생:', error);
        return false;
    }
} 