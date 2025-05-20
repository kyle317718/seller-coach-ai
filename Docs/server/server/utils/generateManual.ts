import puppeteer from 'puppeteer';
import { manualSteps } from '../app/guide/page';

interface ManualOptions {
    includeVideos?: boolean;
    language?: 'ko' | 'en';
    format?: 'A4' | 'Letter';
}

export const generateManual = async (options: ManualOptions = {}) => {
    const {
        includeVideos = true,
        language = 'ko',
        format = 'A4'
    } = options;

    try {
        const browser = await puppeteer.launch({
            headless: 'new'
        });

        const page = await browser.newPage();

        // 스타일 및 폰트 설정
        await page.setContent(`
            <!DOCTYPE html>
            <html lang="${language}">
            <head>
                <meta charset="UTF-8">
                <style>
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    
                    body {
                        font-family: 'Pretendard', sans-serif;
                        margin: 40px;
                        color: #1a1a1a;
                    }
                    
                    .step {
                        margin-bottom: 30px;
                        padding: 20px;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                    }
                    
                    .step-title {
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 16px;
                        color: #4f46e5;
                    }
                    
                    .tooltip {
                        background: #f3f4f6;
                        padding: 12px;
                        margin: 8px 0;
                        border-radius: 6px;
                    }
                    
                    .video-placeholder {
                        background: #f9fafb;
                        padding: 20px;
                        text-align: center;
                        margin: 16px 0;
                        border-radius: 8px;
                    }
                </style>
            </head>
            <body>
                <h1 style="text-align: center; margin-bottom: 40px;">트레이 AI 사용 가이드</h1>
                
                ${manualSteps.map(step => `
                    <div class="step">
                        <div class="step-title">${step.title}</div>
                        <p>${step.description}</p>
                        
                        ${step.tooltips.map(tooltip => `
                            <div class="tooltip">
                                <strong>${tooltip.field}:</strong> ${tooltip.content}
                            </div>
                        `).join('')}
                        
                        ${includeVideos && step.videoUrl ? `
                            <div class="video-placeholder">
                                🎥 영상 튜토리얼: ${step.videoUrl}
                                <br>
                                <small>(PDF에서 영상을 시청하실 수 없습니다. 웹사이트에서 확인해 주세요.)</small>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
                
                <div style="text-align: center; margin-top: 40px; color: #6b7280;">
                    © ${new Date().getFullYear()} Trae AI. All rights reserved.
                </div>
            </body>
            </html>
        `);

        // PDF 생성
        const pdf = await page.pdf({
            format,
            printBackground: true,
            margin: {
                top: '40px',
                right: '40px',
                bottom: '40px',
                left: '40px'
            }
        });

        await browser.close();
        return pdf;

    } catch (error) {
        console.error('매뉴얼 생성 실패:', error);
        throw error;
    }
}; 