'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface TrendChartProps {
    data: {
        labels: string[];
        values: number[];
        title: string;
        subtitle: string;
    };
}

export default function TrendChart({ data }: TrendChartProps) {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: data.title,
                data: data.values,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: [data.title, data.subtitle],
                font: {
                    size: 14,
                    weight: 'normal' as const,
                },
                padding: {
                    bottom: 20,
                },
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: function (context: any) {
                        return `검색량: ${context.parsed.y}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
    };

    return (
        <div className="w-full h-full">
            <Line data={chartData} options={options} />
        </div>
    );
} 