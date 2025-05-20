'use client';

import { useState } from 'react';
import Image from 'next/image';

interface InputFormProps {
  onSubmit: (data: { text: string; image?: File }) => Promise<void>;
  isLoading?: boolean;
}

export function InputForm({ onSubmit, isLoading = false }: InputFormProps) {
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('이미지는 2MB 이하로 업로드해주세요');
      return;
    }

    // 이미지 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다');
      return;
    }

    setUploadedImage(file);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await onSubmit({
        text: inputText.trim(),
        image: uploadedImage || undefined
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '분석 중 오류가 발생했습니다');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="input-section space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium">
            상품명 또는 키워드
          </label>
          <input
            type="text"
            placeholder="예: 반려동물 자동 급수기"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={50}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium">
            이미지 업로드 (선택)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              이미지 선택
            </label>
            {uploadedImage && (
              <div className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <Image
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  className="text-red-500 hover:text-red-600"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className={`w-full py-3 rounded-lg text-white font-medium transition-all
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : !inputText.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {isLoading ? '분석 중...' : '분석 시작'}
        </button>
      </div>
    </form>
  );
} 