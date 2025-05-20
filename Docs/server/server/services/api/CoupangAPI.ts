import axios from 'axios';
import crypto from 'crypto';

interface CoupangProduct {
    productId: string;
    title: string;
    price: number;
    rating: number;
    reviewCount: number;
}

export class CoupangAPI {
    private readonly baseURL = 'https://api-gateway.coupang.com';
    private readonly accessKey: string;
    private readonly secretKey: string;

    constructor() {
        this.accessKey = process.env.COUPANG_ACCESS_KEY || '';
        this.secretKey = process.env.COUPANG_SECRET_KEY || '';
    }

    async searchProducts(keyword: string): Promise<CoupangProduct[]> {
        try {
            const timestamp = new Date().toISOString();
            const path = `/v2/providers/affiliate_open_api/1.0/products/search?keyword=${encodeURIComponent(keyword)}`;

            const signature = this.generateSignature('GET', path, timestamp);

            const response = await axios.get(`${this.baseURL}${path}`, {
                headers: {
                    'Authorization': `CEA ${this.accessKey}:${signature}`,
                    'X-Timestamp': timestamp,
                },
            });

            return this.transformProductData(response.data);
        } catch (error) {
            console.error('Coupang API Error:', error);
            throw new Error('Failed to fetch product data');
        }
    }

    private generateSignature(method: string, path: string, timestamp: string): string {
        const message = `${method}\n${path}\n${timestamp}`;
        return crypto
            .createHmac('sha256', this.secretKey)
            .update(message)
            .digest('hex');
    }

    private transformProductData(data: any): CoupangProduct[] {
        return data.products.map((product: any) => ({
            productId: product.productId,
            title: product.title,
            price: product.price,
            rating: product.rating,
            reviewCount: product.reviewCount,
        }));
    }
} 