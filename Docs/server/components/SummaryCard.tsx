'use client';

interface SummaryCardProps {
    summary: string;
    steps: Array<{
        title: string;
        content: string;
    }>;
}

export default function SummaryCard({ summary, steps }: SummaryCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">분석 요약</h2>
                <p className="mt-2 text-gray-600">{summary}</p>
            </div>
            <div className="space-y-4">
                {steps.map((step, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold text-gray-800">{step.title}</h3>
                        <p className="mt-1 text-gray-600">{step.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 