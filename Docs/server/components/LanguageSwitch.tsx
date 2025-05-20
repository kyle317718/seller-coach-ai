'use client';

import { Language, getTranslation } from '@/utils/i18n';

interface LanguageSwitchProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitch({ currentLang, onLanguageChange }: LanguageSwitchProps) {
  const toggleLanguage = () => {
    onLanguageChange(currentLang === 'ko' ? 'zh' : 'ko');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      aria-label={getTranslation('change_language', currentLang)}
    >
      <span className="text-lg">
        {currentLang === 'ko' ? '🇰🇷' : '🇨🇳'}
      </span>
      <span className="text-sm font-medium text-gray-700">
        {getTranslation('language', currentLang)}
      </span>
    </button>
  );
} 