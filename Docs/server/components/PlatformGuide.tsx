'use client';

import { useState } from 'react';
import { Language } from '@/utils/i18n';
import { PlatformKey, PlatformRequirement, getPlatformGuide, recommendPlatform } from '@/utils/platformGuide';
import { CoupangIcon, NaverIcon, ElevenIcon } from '@/components/icons';

interface PlatformGuideProps {
  language: Language;
  category?: string;
}

const PLATFORMS: Record<PlatformKey, { name: string; icon: React.ComponentType }> = {
  coupang: { name: '쿠팡', icon: CoupangIcon },
  naver: { name: '네이버', icon: NaverIcon },
  eleven: { name: '11번가', icon: ElevenIcon },
};

export default function PlatformGuide({ language, category }: PlatformGuideProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>('coupang');
  const guide = getPlatformGuide(selectedPlatform, language);
  
  const recommendedPlatforms = category ? recommendPlatform(category, language) : Object.keys(PLATFORMS) as PlatformKey[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {recommendedPlatforms.map((platform) => {
          const Icon = PLATFORMS[platform].icon;
          return (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedPlatform === platform
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon />
              <span>{PLATFORMS[platform].name}</span>
            </button>
          );
        })}
      </div>

      {guide && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">수수료</h3>
            <p>{guide.fee}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">입점 요건</h3>
            <ul className="list-disc pl-5">
              {guide.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">통관 요건</h3>
            <ul className="list-disc pl-5">
              {guide.customs.map((custom, i) => (
                <li key={i}>{custom}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">필요 서류</h3>
            <ul className="list-disc pl-5">
              {guide.documents.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">예상 소요 기간</h3>
            <p>{guide.timeline}</p>
          </div>
        </div>
      )}
    </div>
  );
} 