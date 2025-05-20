'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TagInputProps {
    tags: string[];
    setTags: (tags: string[]) => void;
    placeholder?: string;
}

export function TagInput({ tags, setTags, placeholder = '태그 입력...' }: TagInputProps) {
    const [input, setInput] = useState('');

    const addTag = () => {
        if (input.trim()) {
            if (!tags.includes(input.trim())) {
                setTags([...tags, input.trim()]);
                setInput('');
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        addTag();
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                        <span>{tag}</span>
                        <button
                            onClick={() => removeTag(tag)}
                            className="w-5 h-5 flex items-center justify-center text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                            aria-label={`Remove ${tag} tag`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 p-2 border rounded-md text-base sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                    onClick={addTag}
                    onTouchEnd={handleTouchEnd}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    추가
                </Button>
            </div>
        </div>
    );
} 