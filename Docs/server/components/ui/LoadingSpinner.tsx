interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string;
    progress?: number;
    className?: string;
}

export function LoadingSpinner({
    size = 'md',
    message,
    progress,
    className = ''
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className="relative">
                <div
                    className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
                />
                {progress !== undefined && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-600">
                            {Math.round(progress)}%
                        </span>
                    </div>
                )}
            </div>
            {message && (
                <div className="mt-3 text-center w-full">
                    <p className="text-sm sm:text-base font-medium text-gray-700 break-words">{message}</p>
                    {progress !== undefined && (
                        <div className="mt-2 w-full max-w-[12rem] mx-auto">
                            <div className="bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 