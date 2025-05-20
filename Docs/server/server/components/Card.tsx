'use client';

import React from 'react';
import { ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm ${className}`}>
            {children}
        </div>
    );
};

export default Card; 