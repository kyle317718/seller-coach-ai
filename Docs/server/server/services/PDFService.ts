import html_to_pdf from 'html-pdf-node';

export interface PDFReportData {
    title: string;
    companyName: string;
    metrics: Array<{
        label: string;
        value: number;
        color: string;
    }>;
    summary: string;
    recommendations: string[];
}

export class PDFService {
    static async generateReport(data: PDFReportData): Promise<Buffer> {
        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 40px;
                            color: #333;
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                            border-bottom: 2px solid #eee;
                            padding-bottom: 20px;
                        }
                        .date {
                            color: #666;
                            font-size: 14px;
                        }
                        .metrics {
                            margin: 30px 0;
                        }
                        .metric {
                            margin: 15px 0;
                        }
                        .metric-bar {
                            height: 20px;
                            background-color: #eee;
                            border-radius: 10px;
                            overflow: hidden;
                            margin-top: 5px;
                        }
                        .metric-fill {
                            height: 100%;
                        }
                        .recommendations {
                            margin: 30px 0;
                        }
                        .footer {
                            margin-top: 50px;
                            text-align: center;
                            font-size: 12px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>${data.title}</h1>
                        <div class="date">Generated on ${new Date().toLocaleDateString()}</div>
                        <div>${data.companyName}</div>
                    </div>

                    <div class="metrics">
                        <h2>Key Metrics</h2>
                        ${data.metrics.map(metric => `
                            <div class="metric">
                                <div>${metric.label}: ${metric.value}%</div>
                                <div class="metric-bar">
                                    <div class="metric-fill" style="width: ${metric.value}%; background-color: ${metric.color}"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="summary">
                        <h2>Summary</h2>
                        <p>${data.summary}</p>
                    </div>

                    <div class="recommendations">
                        <h2>Recommendations</h2>
                        <ul>
                            ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="footer">
                        <p>© ${new Date().getFullYear()} ${data.companyName}. All rights reserved.</p>
                    </div>
                </body>
            </html>
        `;

        const options = {
            format: 'A4',
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        };

        try {
            const buffer = await html_to_pdf.generatePdf({ content: html }, options);
            return buffer;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    }
} 