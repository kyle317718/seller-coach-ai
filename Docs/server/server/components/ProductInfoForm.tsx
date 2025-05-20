'use client';

import { useState, useEffect } from 'react';
import { Card } from './Card';

interface ProductInfo {
    name: string;
    category: string;
    description: string;
    targetMarket: string;
    price: number;
    features: string[];
}

interface ProductInfoFormProps {
    onSubmit: (data: ProductInfo) => void;
    initialData?: ProductInfo;
}

const ProductInfoForm = ({ onSubmit, initialData }: ProductInfoFormProps) => {
    const [formData, setFormData] = useState<ProductInfo>({
        name: '',
        category: '',
        description: '',
        targetMarket: '',
        price: 0,
        features: ['']
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({
            ...prev,
            features: newFeatures
        }));
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const removeFeature = (index: number) => {
        if (formData.features.length > 1) {
            setFormData(prev => ({
                ...prev,
                features: prev.features.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 모든 필드가 채워져 있는지 확인
        const isValid = Object.values(formData).every(value =>
            Array.isArray(value) ? value.length > 0 && value.every(v => v.trim() !== '') : value.toString().trim() !== ''
        );

        if (isValid) {
            onSubmit(formData);
        } else {
            alert('모든 필드를 채워주세요.');
        }
    };

    return (
        <Card
            title="제품 기본 정보"
            showToggle={true}
            className="md:col-span-2"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            제품명
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            카테고리
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                        >
                            <option value="">카테고리 선택</option>
                            <option value="전자제품">전자제품</option>
                            <option value="의류">의류</option>
                            <option value="식품">식품</option>
                            <option value="화장품">화장품</option>
                            <option value="가구">가구</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            제품 설명
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700 mb-1">
                            목표 시장
                        </label>
                        <input
                            type="text"
                            id="targetMarket"
                            name="targetMarket"
                            value={formData.targetMarket}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            가격 (원)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            주요 특징
                        </label>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    className="flex-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="제품의 주요 특징을 입력하세요"
                                    required
                                />
                                {formData.features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-pretendard font-medium"
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFeature}
                            className="mt-2 px-4 py-2 text-sm font-pretendard font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            + 특징 추가
                        </button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg font-pretendard font-bold transition-all duration-200 bg-primary text-white hover:bg-primary-hover active:transform active:scale-95"
                    >
                        다음 단계
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default ProductInfoForm; 