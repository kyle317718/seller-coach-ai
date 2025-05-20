interface PerformanceMetric {
    timestamp: number;
    responseTime: number;
    endpoint: string;
    statusCode: number;
    memoryUsage: number;
    cpuUsage: number;
}

interface PerformanceReport {
    averageResponseTime: number;
    successRate: number;
    errorRate: number;
    memoryUtilization: number;
    cpuUtilization: number;
    timeRange: {
        start: number;
        end: number;
    };
}

export class PerformanceMonitor {
    private metrics: PerformanceMetric[] = [];
    private readonly maxMetricsLength: number = 1000;
    private static instance: PerformanceMonitor;

    private constructor() { }

    static getInstance(): PerformanceMonitor {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    }

    async recordMetric(metric: Omit<PerformanceMetric, 'memoryUsage' | 'cpuUsage'>): Promise<void> {
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // MB
        const cpuUsage = await this.getCPUUsage();

        const fullMetric: PerformanceMetric = {
            ...metric,
            memoryUsage,
            cpuUsage
        };

        this.metrics.push(fullMetric);

        // Keep only the last maxMetricsLength metrics
        if (this.metrics.length > this.maxMetricsLength) {
            this.metrics = this.metrics.slice(-this.maxMetricsLength);
        }

        // Log metrics for monitoring
        console.log('Performance Metric:', {
            endpoint: fullMetric.endpoint,
            responseTime: `${fullMetric.responseTime}ms`,
            statusCode: fullMetric.statusCode,
            memoryUsage: `${memoryUsage.toFixed(2)}MB`,
            cpuUsage: `${cpuUsage.toFixed(2)}%`
        });
    }

    private async getCPUUsage(): Promise<number> {
        return new Promise((resolve) => {
            const startUsage = process.cpuUsage();

            // Measure CPU usage over 100ms
            setTimeout(() => {
                const endUsage = process.cpuUsage(startUsage);
                const userCPUUsagePercent = (endUsage.user / 1000000) * 100;
                const systemCPUUsagePercent = (endUsage.system / 1000000) * 100;
                resolve(userCPUUsagePercent + systemCPUUsagePercent);
            }, 100);
        });
    }

    getReport(timeRange?: { start: number; end: number }): PerformanceReport {
        let relevantMetrics = this.metrics;

        if (timeRange) {
            relevantMetrics = this.metrics.filter(
                (metric) => metric.timestamp >= timeRange.start && metric.timestamp <= timeRange.end
            );
        }

        if (relevantMetrics.length === 0) {
            throw new Error('No metrics available for the specified time range');
        }

        const totalMetrics = relevantMetrics.length;
        const successfulRequests = relevantMetrics.filter((m) => m.statusCode >= 200 && m.statusCode < 400).length;

        const report: PerformanceReport = {
            averageResponseTime:
                relevantMetrics.reduce((sum, metric) => sum + metric.responseTime, 0) / totalMetrics,
            successRate: (successfulRequests / totalMetrics) * 100,
            errorRate: ((totalMetrics - successfulRequests) / totalMetrics) * 100,
            memoryUtilization:
                relevantMetrics.reduce((sum, metric) => sum + metric.memoryUsage, 0) / totalMetrics,
            cpuUtilization:
                relevantMetrics.reduce((sum, metric) => sum + metric.cpuUsage, 0) / totalMetrics,
            timeRange: {
                start: timeRange?.start || relevantMetrics[0].timestamp,
                end: timeRange?.end || relevantMetrics[relevantMetrics.length - 1].timestamp
            }
        };

        // Log performance report
        console.log('Performance Report:', {
            ...report,
            averageResponseTime: `${report.averageResponseTime.toFixed(2)}ms`,
            successRate: `${report.successRate.toFixed(2)}%`,
            errorRate: `${report.errorRate.toFixed(2)}%`,
            memoryUtilization: `${report.memoryUtilization.toFixed(2)}MB`,
            cpuUtilization: `${report.cpuUtilization.toFixed(2)}%`,
            metricsAnalyzed: totalMetrics
        });

        return report;
    }

    clearMetrics(): void {
        this.metrics = [];
        console.log('Performance metrics cleared');
    }
} 