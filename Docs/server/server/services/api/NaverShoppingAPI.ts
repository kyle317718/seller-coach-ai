import axios from 'axios';

interface NaverShoppingTrend {
    period: string;
    ratio: number;
}

interface NaverShoppingResponse {
    startDate: string;
    endDate: string;
    timeUnit: string;
    results: Array<{
        title: string;
        keywords: string[];
        data: NaverShoppingTrend[];
    }>;
}

export class NaverShoppingAPI {
    private clientId: string;
    private clientSecret: string;
    private baseURL: string = 'https://naveropenapi.apigw.ntruss.com/datalab/v1';

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    async getSearchTrend(keyword: string): Promise<NaverShoppingTrend[]> {
        try {
            const response = await axios.post<NaverShoppingResponse>(
                `${this.baseURL}/search`,
                {
                    startDate: this.getStartDate(),
                    endDate: this.getEndDate(),
                    timeUnit: 'date',
                    keywordGroups: [
                        {
                            groupName: keyword,
                            keywords: [keyword]
                        }
                    ]
                },
                {
                    headers: {
                        'X-NCP-APIGW-API-KEY-ID': this.clientId,
                        'X-NCP-APIGW-API-KEY': this.clientSecret,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.data?.results?.[0]?.data) {
                throw new Error('Invalid response structure from Naver Shopping API');
            }

            return response.data.results[0].data;
        } catch (error) {
            console.error('Error fetching Naver Shopping trend:', error);
            throw new Error('Failed to fetch shopping trend data');
        }
    }

    private getStartDate(): string {
        const date = new Date();
        date.setDate(date.getDate() - 30); // Get data for last 30 days
        return date.toISOString().split('T')[0];
    }

    private getEndDate(): string {
        const date = new Date();
        return date.toISOString().split('T')[0];
    }
} 