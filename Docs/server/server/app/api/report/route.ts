import { NextRequest, NextResponse } from 'next/server';
import { PDFService, PDFReportData } from '../../../services/PDFService';

export async function POST(request: NextRequest) {
    try {
        const data: PDFReportData = await request.json();

        // Validate required fields
        if (!data.title || !data.companyName || !data.metrics || !data.summary || !data.recommendations) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate PDF
        const pdfBuffer = await PDFService.generateReport(data);

        // Return PDF as attachment
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="report-${Date.now()}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
} 