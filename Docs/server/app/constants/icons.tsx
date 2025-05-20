'use client';

import { FC } from 'react';

export const ANALYSIS_ICONS = {
    market: "📈",    // 시장 분석
    risk: "⚠️",     // 리스크 분석
    trend: "📊",    // 트렌드 분석
    target: "🎯",   // 타겟 분석
    pricing: "💰",  // 가격 분석
    competitor: "🥊", // 경쟁사 분석
    strategy: "🎮"  // 전략 분석
} as const;

export const SECTION_ICONS = {
    market: {
        size: "📊",       // 시장 규모
        growth: "📈",     // 성장률
        barrier: "🚧"     // 진입 장벽
    },
    risk: {
        market: "⚠️",     // 시장 리스크
        operation: "⚙️",  // 운영 리스크
        financial: "💸"   // 재무 리스크
    },
    trend: {
        current: "📱",    // 현재 트렌드
        future: "🔮",     // 미래 트렌드
        tech: "🤖"        // 기술 트렌드
    }
} as const;

export interface IconProps {
    icon: string;
    label: string;
    className?: string;
}

export const Icon: FC<IconProps> = ({ icon, label, className = "" }) => (
    <span role= "img" aria-label={ label } className = { className } >
        { icon }
        </span>
); 