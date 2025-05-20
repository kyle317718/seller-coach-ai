import autocannon from 'autocannon';
import { EventEmitter } from 'events';

interface LoadTestConfig {
    url: string;
    connections?: number;
    pipelining?: number;
    duration?: number;
    requests?: string[];
}

interface LoadTestResult {
    rps: number;
    latency: {
        min: number;
        max: number;
        avg: number;
    };
    errors: number;
    timeouts: number;
    success: boolean;
}

export class LoadTester extends EventEmitter {
    private static instance: LoadTester;
    private isRunning: boolean = false;

    private constructor() {
        super();
    }

    static getInstance(): LoadTester {
        if (!LoadTester.instance) {
            LoadTester.instance = new LoadTester();
        }
        return LoadTester.instance;
    }

    async runTest(config: LoadTestConfig): Promise<LoadTestResult> {
        if (this.isRunning) {
            throw new Error('Load test already in progress');
        }

        this.isRunning = true;
        this.emit('start');

        try {
            const result = await autocannon({
                url: config.url,
                connections: config.connections || 100,
                pipelining: config.pipelining || 10,
                duration: config.duration || 10,
                requests: config.requests || [
                    {
                        method: 'GET',
                        path: '/'
                    }
                ],
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const testResult: LoadTestResult = {
                rps: result.requests.average,
                latency: {
                    min: result.latency.min,
                    max: result.latency.max,
                    avg: result.latency.average
                },
                errors: result.errors,
                timeouts: result.timeouts,
                success: result.requests.average >= 1000 && result.errors === 0
            };

            this.emit('complete', testResult);
            return testResult;

        } catch (error) {
            this.emit('error', error);
            throw error;
        } finally {
            this.isRunning = false;
        }
    }

    async testEndpoint(endpoint: string, method: string = 'GET', payload?: any): Promise<void> {
        const config: LoadTestConfig = {
            url: `http://localhost:${process.env.PORT || 3000}${endpoint}`,
            duration: 30,
            connections: 100,
            requests: [
                {
                    method,
                    path: endpoint,
                    ...(payload && { body: JSON.stringify(payload) })
                }
            ]
        };

        const result = await this.runTest(config);
        console.log(`Load test results for ${endpoint}:`, {
            requestsPerSecond: result.rps,
            latency: result.latency,
            errors: result.errors,
            timeouts: result.timeouts,
            success: result.success ? '✅ Passed' : '❌ Failed'
        });
    }

    async testAllEndpoints(): Promise<void> {
        const endpoints = [
            { path: '/api/analysis', method: 'POST' },
            { path: '/api/performance', method: 'GET' },
            { path: '/api/report', method: 'GET' }
        ];

        for (const endpoint of endpoints) {
            await this.testEndpoint(endpoint.path, endpoint.method);
        }
    }
} 