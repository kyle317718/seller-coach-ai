import { NextRequest, NextResponse } from 'next/server';
import { MarketingAutomationService } from '../../../../services/MarketingAutomationService';

export async function GET(
    request: NextRequest,
    { params }: { params: { analysisId: string } }
) {
    try {
        // In a real application, you would fetch this data from your database
        // This is mock data for demonstration
        const mockData = [
            {
                predictedRevenue: 1200000,
                actualRevenue: 1350000,
                performanceDiff: 12.5,
                date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            },
            {
                predictedRevenue: 1200000,
                actualRevenue: 1400000,
                performanceDiff: 16.7,
                date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                predictedRevenue: 1200000,
                actualRevenue: 1450000,
                performanceDiff: 20.8,
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                predictedRevenue: 1200000,
                actualRevenue: 1500000,
                performanceDiff: 25.0,
                date: new Date().toISOString(),
            },
        ];

        return NextResponse.json(mockData);
    } catch (error) {
        console.error('Error fetching performance metrics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch performance metrics' },
            { status: 500 }
        );
    }
} 