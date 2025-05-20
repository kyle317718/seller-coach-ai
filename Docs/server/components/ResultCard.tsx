'use client';

interface Metric {
  label: string;
  value: string;
  trend?: string;
  status?: 'positive' | 'warning' | 'neutral';
}

interface ResultCardProps {
  title: string;
  icon: string;
  description: string;
  metrics: Metric[];
  onAction?: () => void;
  actionLabel?: string;
}

export function ResultCard({
  title,
  icon,
  description,
  metrics,
  onAction,
  actionLabel = '자세히 보기'
}: ResultCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'positive':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="result-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-1">
            <div className="text-sm text-gray-600">{metric.label}</div>
            <div className="flex items-center space-x-2">
              <span className={`font-semibold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </span>
              {metric.trend && (
                <span className={`text-sm ${metric.trend.startsWith('+')
                  ? 'text-green-600'
                  : metric.trend.startsWith('-')
                    ? 'text-red-600'
                    : 'text-gray-600'
                  }`}>
                  {metric.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="w-full mt-4 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
} 