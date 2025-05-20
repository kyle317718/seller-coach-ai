'use client';

import { useState } from 'react';
import { Card } from './Card';

interface FAQItem {
    question: string;
    answer: string;
    category?: string;
    videoUrl?: string;
}

interface FAQProps {
    items: FAQItem[];
}

export const FAQ = ({ items }: FAQProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <Card
                    key={index}
                    className={`transition-all duration-200 ${expandedIndex === index ? 'ring-2 ring-indigo-500' : ''
                        }`}
                >
                    <button
                        className="w-full text-left p-4 focus:outline-none"
                        onClick={() => handleToggle(index)}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                {item.category && (
                                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                                        {item.category}
                                    </span>
                                )}
                                <h3 className="text-lg font-pretendard font-medium text-gray-900">
                                    {item.question}
                                </h3>
                            </div>
                            <span className={`transform transition-transform duration-200 ${expandedIndex === index ? 'rotate-180' : ''
                                }`}>
                                ▼
                            </span>
                        </div>
                    </button>

                    {expandedIndex === index && (
                        <div className="px-4 pb-4 pt-2 space-y-4">
                            <div className="prose prose-sm max-w-none text-gray-600">
                                {item.answer}
                            </div>
                            {item.videoUrl && (
                                <div className="relative pt-[56.25%]">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        src={item.videoUrl}
                                        title="설명 영상"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
}; 