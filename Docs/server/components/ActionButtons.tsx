'use client';

import { useState } from 'react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ActionButtonsProps {
    onShowDetails?: () => void;
}

export function ActionButtons({ onShowDetails }: ActionButtonsProps) {
    const [isLoading, setIsLoading] = useState(false);

    const saveAsPDF = async () => {
        setIsLoading(true);
        try {
            const element = document.getElementById('analysis-content');
            if (!element) return;

            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('analysis-report.pdf');
        } catch (error) {
            console.error('PDF 생성 중 오류:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
        } catch (error) {
            console.error('링크 복사 중 오류:', error);
        }
    };

    return (
        <div className="flex gap-4 justify-end mb-6">
            <button
                onClick={saveAsPDF}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>저장 중...</span>
                    </>
                ) : (
                    <>
                        <span>📄</span>
                        <span>PDF 저장</span>
                    </>
                )}
            </button>
            <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
            >
                <span>🔗</span>
                <span>공유</span>
            </button>
            {onShowDetails && (
                <button
                    onClick={onShowDetails}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                >
                    <span>🔍</span>
                    <span>상세 보기</span>
                </button>
            )}
        </div>
    );
} 