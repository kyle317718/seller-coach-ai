'use client';

import { useState } from 'react';

interface TooltipProps {
    title: string;
    content: string | string[];
    children: React.ReactNode;
}

export function Tooltip({ title, content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block">
            <div
                className="inline-flex items-center cursor-help"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
                <span className="ml-1 text-blue-500">ℹ️</span>
            </div>

            {isVisible && (
                <div className="absolute z-10 w-72 px-4 py-3 -mt-1 text-sm leading-tight text-white transform -translate-y-full bg-gray-900 rounded-lg shadow-lg top-0 left-0">
                    <div className="font-semibold mb-1">{title}</div>
                    {Array.isArray(content) ? (
                        <ul className="list-disc list-inside space-y-1">
                            {content.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{content}</p>
                    )}
                    <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-6"></div>
                </div>
            )}
        </div>
    );
} 