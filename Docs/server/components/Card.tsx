import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
    return (
        <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
            {title && (
                <div className="border-b p-6">
                    <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
} 