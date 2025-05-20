import axios from 'axios';

interface LoadTestResult {
    averageResponseTime: number;
    successRate: number;
    totalRequests: number;
    failedRequests: number;
}

interface EndpointConfig {
    url: string;
    method: 'GET' | 'POST';
    payload?: any;
}

export class LoadTester {
    private readonly endpoints: EndpointConfig[] = [
        { url: '/api/report', method: 'POST', payload: { test: true } },
        { url: '/api/analysis/risk', method: 'GET' },
        { url: '/api/competitors', method: 'GET' },
        { url: '/api/budget', method: 'GET' }
    ];

    private readonly concurrentUsers = 50;
    private readonly requestsPerUser = 20;
    private readonly baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';

    async runTests(): Promise<LoadTestResult> {
        console.log(`Starting load test with ${this.concurrentUsers} concurrent users`);
        console.log(`Each user will make ${this.requestsPerUser} requests`);

        const startTime = Date.now();
        let totalResponseTime = 0;
        let failedRequests = 0;
        const totalRequests = this.concurrentUsers * this.requestsPerUser;

        const userPromises = Array(this.concurrentUsers).fill(null).map(async (_, userIndex) => {
            const requests = Array(this.requestsPerUser).fill(null).map(async (_, requestIndex) => {
                const endpoint = this.endpoints[requestIndex % this.endpoints.length];
                try {
                    const response = await this.makeRequest(endpoint);
                    return Date.now() - response.startTime;
                } catch (error) {
                    failedRequests++;
                    console.error(`Request failed for user ${userIndex}, request ${requestIndex}:`, error.message);
                    return 0;
                }
            });

            const userResponseTimes = await Promise.all(requests);
            return userResponseTimes.reduce((sum, time) => sum + time, 0);
        });

        const userResults = await Promise.all(userPromises);
        totalResponseTime = userResults.reduce((sum, time) => sum + time, 0);

        const averageResponseTime = totalResponseTime / (totalRequests - failedRequests);
        const successRate = ((totalRequests - failedRequests) / totalRequests) * 100;

        console.log(`Load test completed in ${(Date.now() - startTime) / 1000} seconds`);
        console.log(`Average response time: ${averageResponseTime.toFixed(2)}ms`);
        console.log(`Success rate: ${successRate.toFixed(2)}%`);

        return {
            averageResponseTime,
            successRate,
            totalRequests,
            failedRequests
        };
    }

    private async makeRequest(endpoint: EndpointConfig): Promise<{ startTime: number; endTime: number }> {
        const startTime = Date.now();

        try {
            if (endpoint.method === 'GET') {
                await axios.get(`${this.baseUrl}${endpoint.url}`);
            } else {
                await axios.post(`${this.baseUrl}${endpoint.url}`, endpoint.payload);
            }

            return { startTime, endTime: Date.now() };
        } catch (error) {
            throw new Error(`Request to ${endpoint.url} failed: ${error.message}`);
        }
    }
} 