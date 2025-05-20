import { useState } from 'react';

export function AnalysisForm({ analysisState, setAnalysisState }: any) {
    const [productName, setProductName] = useState('');
    const [targetMarket, setTargetMarket] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAnalysisState((prev: any) => ({
            ...prev,
            productInfo: { productName, targetMarket, priceRange, category },
            step: 1,
            loading: true,
            error: null,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">제품 정보 입력</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    className="border rounded px-3 py-2"
                    placeholder="제품명"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    required
                />
                <input
                    className="border rounded px-3 py-2"
                    placeholder="타겟 시장"
                    value={targetMarket}
                    onChange={e => setTargetMarket(e.target.value)}
                />
                <input
                    className="border rounded px-3 py-2"
                    placeholder="가격대"
                    value={priceRange}
                    onChange={e => setPriceRange(e.target.value)}
                />
                <input
                    className="border rounded px-3 py-2"
                    placeholder="카테고리"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg"
                disabled={analysisState.loading}
            >
                {analysisState.loading ? '분석 중...' : '분석 시작'}
            </button>
            {analysisState.error && <div className="text-red-500 mt-2">{analysisState.error}</div>}
        </form>
    );
} 