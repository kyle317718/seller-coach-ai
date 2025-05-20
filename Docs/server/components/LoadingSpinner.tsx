'use client';

interface LoadingSpinnerProps {
    message?: string;
    progress?: number;
    showSkeleton?: boolean;
}

export default function LoadingSpinner({
    message = 'AI가 분석 중입니다...',
    progress,
    showSkeleton = false
}: LoadingSpinnerProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex flex-col items-center space-y-4">
                    {/* 스피너 애니메이션 */}
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>

                    {/* 메시지 */}
                    <p className="text-gray-700 text-center font-medium">{message}</p>

                    {/* 프로그레스 바 */}
                    {typeof progress === 'number' && (
                        <div className="w-full">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div
                                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-500 text-center">{progress}%</p>
                        </div>
                    )}

                    {/* 스켈레톤 UI */}
                    {showSkeleton && (
                        <div className="w-full space-y-4 mt-4">
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-4 py-1">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-4 py-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 