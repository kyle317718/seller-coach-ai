interface ErrorMessageProps {
    message: string;
    suggestion?: string;
    className?: string;
}

export function ErrorMessage({ message, suggestion, className = '' }: ErrorMessageProps) {
    return (
        <div className={`bg-red-50 border border-red-200 rounded-md p-4 ${className}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{message}</h3>
                    {suggestion && (
                        <div className="mt-2 text-sm text-red-700">
                            <p>{suggestion}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 