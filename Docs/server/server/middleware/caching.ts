import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CACHE_DURATION = 5 * 60; // 5 minutes in seconds
const apiCache = new Map<string, { data: any; timestamp: number }>();

export function withCache(handler: Function) {
    return async (req: NextRequest) => {
        const cacheKey = new URL(req.url).pathname;
        const now = Date.now();
        const cached = apiCache.get(cacheKey);

        // Return cached response if valid
        if (cached && (now - cached.timestamp) / 1000 < CACHE_DURATION) {
            return NextResponse.json(cached.data, {
                headers: {
                    'Cache-Control': `public, max-age=${CACHE_DURATION}`,
                    'X-Cache': 'HIT'
                }
            });
        }

        // Get fresh data
        const response = await handler(req);
        const data = await response.json();

        // Cache the new response
        apiCache.set(cacheKey, {
            data,
            timestamp: now
        });

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': `public, max-age=${CACHE_DURATION}`,
                'X-Cache': 'MISS'
            }
        });
    };
}

// Memory cache cleanup
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of apiCache.entries()) {
        if ((now - value.timestamp) / 1000 >= CACHE_DURATION) {
            apiCache.delete(key);
        }
    }
}, CACHE_DURATION * 1000); 