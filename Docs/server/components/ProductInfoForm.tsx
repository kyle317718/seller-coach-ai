'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
    '반려용품',
    '생활용품',
    '전자제품',
    '패션의류',
    '식품',
    '뷰티',
    '가구/인테리어',
    '스포츠/레저'
];

const TARGET_MARKETS = [
    '20대 여성',
    '20대 남성',
    '30대 부부',
    '40대 이상',
    '반려동물 보유 가구',
    '1인 가구',
    '육아 가구',
    '사무직 종사자'
];

interface ProductData {
    name: string;
    category: string;
    priceRange: [number, number];
    target: string[];
}

export function ProductInfoForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState<ProductData>({
        name: '',
        category: '반려용품',
        priceRange: [10000, 50000],
        target: []
    });

    const handlePriceChange = (value: number, index: 0 | 1) => {
        setProductData(prev => ({
            ...prev,
            priceRange: index === 0
                ? [Math.min(value, prev.priceRange[1] - 1000), prev.priceRange[1]]
                : [prev.priceRange[0], Math.max(value, prev.priceRange[0] + 1000)]
        }));
    };

    const handleTargetChange = (value: string) => {
        setProductData(prev => ({
            ...prev,
            target: prev.target.includes(value)
                ? prev.target.filter(t => t !== value)
                : [...prev.target, value]
        }));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (productData.target.length === 0) {
            alert('타겟을 하나 이상 선택해주세요.');
            return;
        }
        setLoading(true);

        try {
            // 분석 페이지로 이동
            router.push('/analysis/trend');
        } catch (error) {
            console.error('분석 시작 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    제품명
                </label>
                <input
                    type="text"
                    value={productData.name}
                    onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="예: 강아지 자동 급수기"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                </label>
                <select
                    value={productData.category}
                    onChange={(e) => setProductData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white"
                    required
                >
                    {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                    가격대
                </label>
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-500 w-12">최소</span>
                        <div className="flex-1">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="1000"
                                value={productData.priceRange[0]}
                                onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">￦</span>
                            <input
                                type="number"
                                value={productData.priceRange[0]}
                                onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                                className="w-24 px-2 py-1 text-right border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-500 w-12">최대</span>
                        <div className="flex-1">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="1000"
                                value={productData.priceRange[1]}
                                onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">￦</span>
                            <input
                                type="number"
                                value={productData.priceRange[1]}
                                onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                                className="w-24 px-2 py-1 text-right border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                        선택된 가격대: ￦{formatPrice(productData.priceRange[0])} ~ ￦{formatPrice(productData.priceRange[1])}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    타겟
                </label>
                <div className="grid grid-cols-2 gap-4">
                    {TARGET_MARKETS.map(market => (
                        <label key={market} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={productData.target.includes(market)}
                                onChange={() => handleTargetChange(market)}
                                className="h-4 w-4 rounded text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-700">{market}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? '분석 중...' : '분석 시작하기'}
                </button>
            </div>
        </form>
    );
} 