import { useState } from 'react';
import { Card } from '@/components/Card';

interface ManualOptions {
    format: 'A4' | 'Letter';
    language: 'ko' | 'en';
    includeVideos: boolean;
}

export default function ManualGenerator() {
    const [options, setOptions] = useState<ManualOptions>({
        format: 'A4',
        language: 'ko',
        includeVideos: true
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleOptionChange = (key: keyof ManualOptions, value: string | boolean) => {
        setOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const generateManual = async () => {
        try {
            setIsGenerating(true);
            const queryParams = new URLSearchParams({
                format: options.format,
                language: options.language,
                includeVideos: options.includeVideos.toString()
            });

            const response = await fetch(`/api/manual?${queryParams}`);

            if (!response.ok) {
                throw new Error('매뉴얼 생성에 실패했습니다.');
            }

            // PDF 다운로드 처리
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'trae-ai-manual.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            console.error('매뉴얼 생성 오류:', error);
            alert('매뉴얼 생성 중 오류가 발생했습니다.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">매뉴얼 생성</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        용지 크기
                    </label>
                    <select
                        value={options.format}
                        onChange={(e) => handleOptionChange('format', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="A4">A4</option>
                        <option value="Letter">Letter</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        언어
                    </label>
                    <select
                        value={options.language}
                        onChange={(e) => handleOptionChange('language', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={options.includeVideos}
                            onChange={(e) => handleOptionChange('includeVideos', e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-sm font-medium">
                            비디오 튜토리얼 포함
                        </span>
                    </label>
                </div>

                <button
                    onClick={generateManual}
                    disabled={isGenerating}
                    className={`w-full py-2 px-4 rounded-md text-white ${isGenerating
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isGenerating ? '생성 중...' : '매뉴얼 생성하기'}
                </button>
            </div>
        </Card>
    );
} 