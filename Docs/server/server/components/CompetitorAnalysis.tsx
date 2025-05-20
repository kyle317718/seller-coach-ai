'use client';

import { useState, useEffect } from 'react';
import { Card } from './Card';

interface Competitor {
    name: string;
    strengths: string[];
    weaknesses: string[];
    marketShare: number;
    pricePoint: number;
}

interface CompetitorAnalysisData {
    competitors: Competitor[];
    differentiators: string[];
}

interface CompetitorAnalysisProps {
    onSubmit: (data: CompetitorAnalysisData) => void;
    initialData?: CompetitorAnalysisData;
}

const CompetitorAnalysis = ({ onSubmit, initialData }: CompetitorAnalysisProps) => {
    const [formData, setFormData] = useState<CompetitorAnalysisData>({
        competitors: [{
            name: '',
            strengths: [''],
            weaknesses: [''],
            marketShare: 0,
            pricePoint: 0
        }],
        differentiators: ['']
    });
    const [renderTime, setRenderTime] = useState<number>(0);

    useEffect(() => {
        if (initialData) {
            const startTime = performance.now();
            setFormData(initialData);
            const endTime = performance.now();
            setRenderTime(endTime - startTime);

            // Log if rendering takes more than 1 second
            if (endTime - startTime > 1000) {
                console.warn(`Competitor analysis rendering took ${endTime - startTime}ms`);
            }
        }
    }, [initialData]);

    // Performance monitoring for competitor updates
    const measureRenderTime = (callback: () => void) => {
        const startTime = performance.now();
        callback();
        const endTime = performance.now();
        setRenderTime(endTime - startTime);
    };

    const handleCompetitorChange = (index: number, field: keyof Competitor, value: any) => {
        measureRenderTime(() => {
            const newCompetitors = [...formData.competitors];
            newCompetitors[index] = {
                ...newCompetitors[index],
                [field]: value
            };
            setFormData(prev => ({
                ...prev,
                competitors: newCompetitors
            }));
        });
    };

    const handleArrayChange = (index: number, field: 'strengths' | 'weaknesses', competitorIndex: number, value: string) => {
        const newCompetitors = [...formData.competitors];
        const newArray = [...newCompetitors[competitorIndex][field]];
        newArray[index] = value;
        newCompetitors[competitorIndex] = {
            ...newCompetitors[competitorIndex],
            [field]: newArray
        };
        setFormData(prev => ({
            ...prev,
            competitors: newCompetitors
        }));
    };

    const handleDifferentiatorChange = (index: number, value: string) => {
        const newDifferentiators = [...formData.differentiators];
        newDifferentiators[index] = value;
        setFormData(prev => ({
            ...prev,
            differentiators: newDifferentiators
        }));
    };

    const addCompetitor = () => {
        setFormData(prev => ({
            ...prev,
            competitors: [...prev.competitors, {
                name: '',
                strengths: [''],
                weaknesses: [''],
                marketShare: 0,
                pricePoint: 0
            }]
        }));
    };

    const removeCompetitor = (index: number) => {
        if (formData.competitors.length > 1) {
            setFormData(prev => ({
                ...prev,
                competitors: prev.competitors.filter((_, i) => i !== index)
            }));
        }
    };

    const addArrayItem = (field: 'strengths' | 'weaknesses', competitorIndex: number) => {
        const newCompetitors = [...formData.competitors];
        newCompetitors[competitorIndex][field].push('');
        setFormData(prev => ({
            ...prev,
            competitors: newCompetitors
        }));
    };

    const removeArrayItem = (field: 'strengths' | 'weaknesses', competitorIndex: number, index: number) => {
        if (formData.competitors[competitorIndex][field].length > 1) {
            const newCompetitors = [...formData.competitors];
            newCompetitors[competitorIndex][field] = newCompetitors[competitorIndex][field].filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                competitors: newCompetitors
            }));
        }
    };

    const addDifferentiator = () => {
        setFormData(prev => ({
            ...prev,
            differentiators: [...prev.differentiators, '']
        }));
    };

    const removeDifferentiator = (index: number) => {
        if (formData.differentiators.length > 1) {
            setFormData(prev => ({
                ...prev,
                differentiators: prev.differentiators.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 모든 필드가 채워져 있는지 확인
        const isValid = formData.competitors.every(competitor =>
            competitor.name.trim() !== '' &&
            competitor.strengths.every(s => s.trim() !== '') &&
            competitor.weaknesses.every(w => w.trim() !== '') &&
            competitor.marketShare > 0 &&
            competitor.pricePoint > 0
        ) && formData.differentiators.every(d => d.trim() !== '');

        if (isValid) {
            onSubmit(formData);
        } else {
            alert('모든 필드를 채워주세요.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {renderTime > 0 && renderTime > 1000 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                    <p className="text-yellow-700 text-sm">
                        렌더링 시간이 1초를 초과했습니다 ({Math.round(renderTime)}ms)
                    </p>
                </div>
            )}
            <div className="space-y-6">
                <h2 className="text-xl font-pretendard font-bold text-gray-900">경쟁사 분석</h2>
                {formData.competitors.map((competitor, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-pretendard font-semibold text-gray-900">경쟁사 {index + 1}</h3>
                            {formData.competitors.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeCompetitor(index)}
                                    className="text-red-600 hover:text-red-700 font-pretendard font-medium"
                                >
                                    삭제
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-pretendard font-medium text-gray-700">
                                    회사명
                                </label>
                                <input
                                    type="text"
                                    value={competitor.name}
                                    onChange={(e) => handleCompetitorChange(index, 'name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-pretendard font-medium text-gray-700">
                                    시장 점유율 (%)
                                </label>
                                <input
                                    type="number"
                                    value={competitor.marketShare}
                                    onChange={(e) => handleCompetitorChange(index, 'marketShare', Number(e.target.value))}
                                    min="0"
                                    max="100"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-pretendard font-medium text-gray-700">
                                    제품 가격 (원)
                                </label>
                                <input
                                    type="number"
                                    value={competitor.pricePoint}
                                    onChange={(e) => handleCompetitorChange(index, 'pricePoint', Number(e.target.value))}
                                    min="0"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-pretendard font-medium text-gray-700 mb-2">
                                강점
                            </label>
                            {competitor.strengths.map((strength, strengthIndex) => (
                                <div key={strengthIndex} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={strength}
                                        onChange={(e) => handleArrayChange(strengthIndex, 'strengths', index, e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="경쟁사의 강점을 입력하세요"
                                        required
                                    />
                                    {competitor.strengths.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('strengths', index, strengthIndex)}
                                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-pretendard font-medium"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('strengths', index)}
                                className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-pretendard font-medium"
                            >
                                + 강점 추가
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-pretendard font-medium text-gray-700 mb-2">
                                약점
                            </label>
                            {competitor.weaknesses.map((weakness, weaknessIndex) => (
                                <div key={weaknessIndex} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={weakness}
                                        onChange={(e) => handleArrayChange(weaknessIndex, 'weaknesses', index, e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="경쟁사의 약점을 입력하세요"
                                        required
                                    />
                                    {competitor.weaknesses.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('weaknesses', index, weaknessIndex)}
                                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-pretendard font-medium"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('weaknesses', index)}
                                className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-pretendard font-medium"
                            >
                                + 약점 추가
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addCompetitor}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-pretendard font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    + 경쟁사 추가
                </button>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-pretendard font-bold text-gray-900">차별화 요소</h2>
                {formData.differentiators.map((differentiator, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            type="text"
                            value={differentiator}
                            onChange={(e) => handleDifferentiatorChange(index, e.target.value)}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="귀사의 제품/서비스만의 차별화 요소를 입력하세요"
                            required
                        />
                        {formData.differentiators.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeDifferentiator(index)}
                                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-pretendard font-medium"
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addDifferentiator}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-pretendard font-medium"
                >
                    + 차별화 요소 추가
                </button>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-pretendard font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    다음 단계
                </button>
            </div>
        </form>
    );
};

export default CompetitorAnalysis; 