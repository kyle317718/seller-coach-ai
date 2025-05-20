'use client';

import { Tooltip } from './Tooltip';

interface MetricBarProps {
    label: string;
    value: number;
    maxValue?: number;
    tooltipContent?: string;
    color?: 'primary' | 'warning' | 'danger' | 'success';
}

export const MetricBar = ({
    label,
    value,
    maxValue = 100,
    tooltipContent,
    color = 'primary'
}: MetricBarProps) => {
    const percentage = (value / maxValue) * 100;

    const getColorClasses = () => {
        switch (color) {
            case 'primary':
                return 'bg-indigo-600';
            case 'warning':
                return 'bg-yellow-500';
            case 'danger':
                return 'bg-red-500';
            case 'success':
                return 'bg-green-500';
            default:
                return 'bg-indigo-600';
        }
    };

    const barContent = (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-pretendard font-medium text-gray-700">{label}</span>
                <span className="text-sm font-pretendard font-medium text-gray-900">{value}%</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${getColorClasses()}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );

    return tooltipContent ? (
        <Tooltip content={tooltipContent}>
            {barContent}
        </Tooltip>
    ) : barContent;
}; 