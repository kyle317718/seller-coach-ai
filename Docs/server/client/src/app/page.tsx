'use client';

import { useState, useRef } from 'react';
import { AnalysisResult } from '@/components/AnalysisResult';

export default function Home() {
    const [productText, setProductText] = useState('');
    const [productImage, setProductImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const analysisResultRef = useRef<any>(null);

    const handleImageSelect = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProductImage(e.target.files[0]);
        }
    };

    const handleStartAnalysis = async () => {
        if (!productText && !productImage) {
            alert('상품 정보를 입력하거나 이미지를 선택해주세요.');
            return;
        }

        const formData = new FormData();
        if (productText) {
            formData.append('text', productText);
        }
        if (productImage) {
            formData.append('image', productImage);
        }

        // AnalysisResult 컴포넌트의 startAnalysis 함수 호출
        analysisResultRef.current?.startAnalysis(formData);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">셀러코치.AI 🚀</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">분석할 상품 정보 입력 🔍</h2>
                <div className="space-y-4">
                    <div>
                        <textarea
                            className="w-full p-4 border rounded-lg"
                            rows={4}
                            placeholder="상품명 또는 설명"
                            value={productText}
                            onChange={(e) => setProductText(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <button
                            className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            onClick={handleImageSelect}
                        >
                            이미지 선택
                            {productImage && <span className="ml-2">✓</span>}
                        </button>
                        <button className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            유사도로 검색하기
                        </button>
                    </div>
                    <button
                        className="w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        onClick={handleStartAnalysis}
                    >
                        AI 분석 시작하기
                    </button>
                </div>
            </section>

            <AnalysisResult ref={analysisResultRef} />
        </main>
    );
} 