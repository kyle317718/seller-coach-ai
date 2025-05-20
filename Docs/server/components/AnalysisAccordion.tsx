import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                className="w-full flex items-center justify-between py-4 px-6 text-left"
                onClick={onToggle}
            >
                <span className="text-lg font-medium text-gray-900">{title}</span>
                {isOpen ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
            </button>
            {isOpen && (
                <div className="px-6 pb-4">
                    {children}
                </div>
            )}
        </div>
    );
}

interface AnalysisAccordionProps {
    sections: {
        title: string;
        content: React.ReactNode;
    }[];
}

export function AnalysisAccordion({ sections }: AnalysisAccordionProps) {
    const [openSections, setOpenSections] = useState<number[]>([0]); // First section open by default

    const toggleSection = (index: number) => {
        setOpenSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
            {sections.map((section, index) => (
                <AccordionItem
                    key={index}
                    title={section.title}
                    isOpen={openSections.includes(index)}
                    onToggle={() => toggleSection(index)}
                >
                    {section.content}
                </AccordionItem>
            ))}
        </div>
    );
} 