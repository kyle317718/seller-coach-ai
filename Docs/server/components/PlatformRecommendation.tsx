'use client';

import { useState } from 'react';
import { ProductProfile } from '@/utils/platformRecommendation';
import { PlatformData } from '@/types/platform';

interface PlatformScoreBarProps {
  platform: string;
  score: number;
  isSelected?: boolean;
  onClick?: () => void;
}

interface RecommendationResultProps {
  platforms: Array<PlatformData & { score: number }>;
  onPlatformSelect?: (platform: PlatformData) => void;
}

const PlatformScoreBar = ({ platform, score, isSelected, onClick }: PlatformScoreBarProps) => (
  <div
    className={`flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer
      ${isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
    onClick={onClick}
  >
    <span className="w-24 font-medium">{platform}</span>
    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-500 ease-out"
        style={{ width: `${score}%` }}
      />
    </div>
    <span className="w-16 text-right font-semibold text-blue-600">
      {score}점
    </span>
  </div>
);

export default function PlatformRecommendation({
  platforms,
  onPlatformSelect
}: RecommendationResultProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handlePlatformClick = (platform: PlatformData) => {
    setSelectedPlatform(platform.key);
    onPlatformSelect?.(platform);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">
        플랫폼 추천 결과
      </h3>
      <div className="space-y-2">
        {platforms.map((platform) => (
          <PlatformScoreBar
            key={platform.key}
            platform={platform.name}
            score={platform.score}
            isSelected={selectedPlatform === platform.key}
            onClick={() => handlePlatformClick(platform)}
          />
        ))}
      </div>
      {selectedPlatform && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            선택하신 플랫폼의 상세 정보를 확인하실 수 있습니다.
            입점 가이드와 통관 요건 등을 자세히 살펴보세요.
          </p>
        </div>
      )}
    </div>
  );
} 