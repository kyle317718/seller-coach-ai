import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// In-memory cache for template data
let templateCache: Buffer | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export async function GET() {
    try {
        const now = Date.now();

        // Return cached template if available and fresh
        if (templateCache && (now - lastCacheTime) < CACHE_DURATION) {
            return new NextResponse(templateCache, {
                headers: {
                    'Content-Type': 'application/x-photoshop',
                    'Content-Disposition': 'attachment; filename="상세페이지_템플릿.psd"',
                    'Cache-Control': 'public, max-age=300'
                }
            });
        }

        // Read template file
        const templatePath = path.join(process.cwd(), 'public', 'templates', 'product-detail.psd');
        const template = await fs.readFile(templatePath);

        // Update cache
        templateCache = template;
        lastCacheTime = now;

        return new NextResponse(template, {
            headers: {
                'Content-Type': 'application/x-photoshop',
                'Content-Disposition': 'attachment; filename="상세페이지_템플릿.psd"',
                'Cache-Control': 'public, max-age=300'
            }
        });
    } catch (error) {
        console.error('Template download error:', error);
        return NextResponse.json(
            { error: '템플릿 다운로드 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
} 