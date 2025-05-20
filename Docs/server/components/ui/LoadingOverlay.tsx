import { LoadingSpinner } from './LoadingSpinner';

interface LoadingOverlayProps {
    isVisible: boolean;
    message?: string;
    progress?: number;
}

export function LoadingOverlay({ isVisible, message, progress }: LoadingOverlayProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 w-full max-w-sm mx-auto">
                <LoadingSpinner
                    size="lg"
                    message={message || '처리 중입니다...'}
                    progress={progress}
                    className="w-full"
                />
            </div>
        </div>
    );
} 