'use client';

import { useRouter } from 'next/navigation';

export function AnalysisHeader() {
    const router = useRouter();

    const handleNewAnalysis = () => {
        router.push('/analysis');
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <span className="mr-2">←</span>
                        뒤로 가기
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <span className="mr-2">🏠</span>
                        홈으로
                    </button>
                </div>
                <button
                    onClick={handleNewAnalysis}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <span className="mr-2">🔄</span>
                    새로운 분석
                </button>
            </div>
        </header>
    );
} 