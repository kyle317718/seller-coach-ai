import { useState, useEffect } from 'react';
import { Card } from './Card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface PerformanceMetrics {
    predictedRevenue: number;
    actualRevenue: number;
    performanceDiff: number;
    date: string;
}

interface PerformanceDashboardProps {
    analysisId: string;
}

export const PerformanceDashboard = ({ analysisId }: PerformanceDashboardProps) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch(`/api/performance/${analysisId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch performance metrics');
                }
                const data = await response.json();
                setMetrics(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetrics();
    }, [analysisId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <Card className="p-6">
                <div className="text-red-500">Error: {error}</div>
            </Card>
        );
    }

    const latestMetrics = metrics[metrics.length - 1];

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-gray-500">예상 매출</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                        {latestMetrics.predictedRevenue.toLocaleString()}원
                    </p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-gray-500">실제 매출</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                        {latestMetrics.actualRevenue.toLocaleString()}원
                    </p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-gray-500">성과 차이</h3>
                    <p className={`mt-2 text-3xl font-semibold ${latestMetrics.performanceDiff >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {latestMetrics.performanceDiff >= 0 ? '+' : ''}
                        {latestMetrics.performanceDiff.toFixed(1)}%
                    </p>
                </Card>
            </div>

            {/* Performance Chart */}
            <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">매출 추이</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={metrics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => `${value.toLocaleString()}원`}
                                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="predictedRevenue"
                                name="예상 매출"
                                stroke="#6366f1"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="actualRevenue"
                                name="실제 매출"
                                stroke="#10b981"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}; 