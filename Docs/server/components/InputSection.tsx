'use client';

import { useState } from 'react';

interface InputSectionProps {
  onSubmit: (data: {
    text: string;
    image?: File;
    audio?: File;
  }) => void;
  isLoading?: boolean;
}

export function InputSection({ onSubmit, isLoading = false }: InputSectionProps) {
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      text: inputText,
      ...(image && { image }),
      ...(audio && { audio })
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          분석할 내용을 입력하세요
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5CA8FF] focus:border-transparent"
          rows={4}
          placeholder="예: 반려동물 자동 급수기 시장 분석해줘"
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지 첨부
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#5CA8FF] file:text-white
              hover:file:bg-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            음성 첨부
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#5CA8FF] file:text-white
              hover:file:bg-blue-600"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !inputText}
        className={`w-full py-3 rounded-lg text-white font-medium
          ${isLoading || !inputText 
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-[#FF6B35] hover:bg-opacity-90'
          }`}
      >
        {isLoading ? '분석 중...' : '분석 시작하기'}
      </button>
    </form>
  );
} 