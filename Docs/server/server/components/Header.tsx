import { LockClosedIcon, PinIcon, SparklesIcon } from '@heroicons/react/24/outline';

export const Header = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">시장 분석 리포트</h1>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                            <LockClosedIcon className="h-4 w-4 mr-1" />
                            <span>24시간 분석</span>
                        </div>
                        <div className="flex items-center">
                            <PinIcon className="h-4 w-4 mr-1" />
                            <span>2024 데이터</span>
                        </div>
                        <div className="flex items-center">
                            <SparklesIcon className="h-4 w-4 mr-1" />
                            <span>정확도 92%</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}; 