import axios from 'axios';

interface MockProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export class MockShoppingAPI {
    private baseUrl = 'https://fakestoreapi.com';

    async getSearchTrend(keyword: string) {
        // Generate mock search trend data
        const today = new Date();
        const data = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            data.push({
                date: date.toISOString().split('T')[0],
                value: Math.floor(Math.random() * 100) + 50
            });
        }

        return {
            keyword,
            data: data.reverse()
        };
    }

    async searchProducts(keyword: string) {
        try {
            // Get products from FakeStoreAPI
            const response = await axios.get<MockProduct[]>(`${this.baseUrl}/products`);

            // Filter and transform products
            const products = response.data
                .filter(product =>
                    product.title.toLowerCase().includes(keyword.toLowerCase()) ||
                    product.description.toLowerCase().includes(keyword.toLowerCase())
                )
                .map(product => ({
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    rating: product.rating.rate,
                    reviewCount: product.rating.count,
                    image: product.image
                }));

            return {
                keyword,
                total: products.length,
                products: products.slice(0, 5) // Return top 5 products
            };
        } catch (error) {
            console.error('Error fetching mock products:', error);
            return {
                keyword,
                total: 0,
                products: []
            };
        }
    }
} 