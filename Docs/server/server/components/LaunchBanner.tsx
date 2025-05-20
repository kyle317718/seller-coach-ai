import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LaunchBannerProps {
    onClose?: () => void;
}

export const LaunchBanner = ({ onClose }: LaunchBannerProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Add entrance animation
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 transform transition-transform duration-300 ${isAnimating ? 'translate-y-full' : 'translate-y-0'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-2xl">🎉</span>
                    <div>
                        <h3 className="font-bold text-lg">정식 출시!</h3>
                        <p className="text-sm text-indigo-100">
                            트레이 AI로 지금 바로 무료 분석을 시작하세요
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        href="/analysis"
                        className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
                    >
                        무료 체험하기
                    </Link>
                    <button
                        onClick={handleClose}
                        className="text-white hover:text-indigo-200 transition-colors"
                        aria-label="배너 닫기"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}; 