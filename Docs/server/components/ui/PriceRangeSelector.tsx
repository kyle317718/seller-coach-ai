'use client';

import React, { useState } from 'react';
import { formatDisplayPrice, formatPriceForAPI } from '@/utils/priceFormatter';

export const PRICE_RANGES = [
    { label: "1만원 미만", value: "0-10000" },
    { label: "1~3만원", value: "10000-30000" },
    { label: "3~5만원", value: "30000-50000" },
    { label: "5~10만원", value: "50000-100000" },
    { label: "10만원 이상", value: "100000-1000000" },
    { label: "직접 입력", value: "custom" }
] as const;

interface PriceRangeSelectorProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function PriceRangeSelector({ value, onChange, error }: PriceRangeSelectorProps) {
    const [showSlider, setShowSlider] = useState(false);
    const [sliderValue, setSliderValue] = useState("50000");

    // 현재 선택된 값이 미리 정의된 범위인지 확인
    const isPredefinedRange = PRICE_RANGES.some(range => range.value === value);

    // 표시할 값 결정
    const displayValue = isPredefinedRange ? value :
        (showSlider ? "custom" : value);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const isCustom = selectedValue === "custom";
        setShowSlider(isCustom);

        if (isCustom) {
            onChange(sliderValue);
        } else {
            onChange(selectedValue);
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSliderValue(newValue);
        onChange(newValue);
    };

    return (
        <div className="space-y-2">
            <select
                value={displayValue}
                onChange={handleSelectChange}
                className={`w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500`}
            >
                <option value="">가격대 선택</option>
                {PRICE_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                        {range.label}
                    </option>
                ))}
            </select>

            {showSlider && (
                <div className="space-y-4">
                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="10000"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>0원</span>
                        <span>{formatDisplayPrice(sliderValue)}</span>
                        <span>100만원</span>
                    </div>
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
}