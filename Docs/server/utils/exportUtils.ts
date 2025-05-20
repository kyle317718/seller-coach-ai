import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface AnalysisResult {
    productName: string;
    category: string;
    subcategory: string;
    priceRange: string;
    targetMarket: string;
    analysis: {
        marketPotential: string;
        competitionAnalysis: string;
        pricingStrategy: string;
        recommendations: string[];
    };
}

export const exportToPDF = (result: AnalysisResult) => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let yPosition = 20;

    // 제목
    doc.setFontSize(20);
    doc.text('제품 분석 보고서', 20, yPosition);
    yPosition += lineHeight * 2;

    // 기본 정보
    doc.setFontSize(12);
    doc.text(`제품명: ${result.productName}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`카테고리: ${result.category} > ${result.subcategory}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`가격대: ${result.priceRange}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`타겟 시장: ${result.targetMarket}`, 20, yPosition);
    yPosition += lineHeight * 2;

    // 분석 결과
    doc.setFontSize(16);
    doc.text('분석 결과', 20, yPosition);
    yPosition += lineHeight * 1.5;

    doc.setFontSize(12);
    const splitMarketPotential = doc.splitTextToSize(`시장 잠재력: ${result.analysis.marketPotential}`, 170);
    doc.text(splitMarketPotential, 20, yPosition);
    yPosition += splitMarketPotential.length * lineHeight;

    const splitCompetition = doc.splitTextToSize(`경쟁 분석: ${result.analysis.competitionAnalysis}`, 170);
    doc.text(splitCompetition, 20, yPosition);
    yPosition += splitCompetition.length * lineHeight;

    const splitPricing = doc.splitTextToSize(`가격 전략: ${result.analysis.pricingStrategy}`, 170);
    doc.text(splitPricing, 20, yPosition);
    yPosition += splitPricing.length * lineHeight * 1.5;

    // 추천사항
    doc.setFontSize(16);
    doc.text('추천사항', 20, yPosition);
    yPosition += lineHeight * 1.5;

    doc.setFontSize(12);
    result.analysis.recommendations.forEach((recommendation, index) => {
        const splitRecommendation = doc.splitTextToSize(`${index + 1}. ${recommendation}`, 170);
        doc.text(splitRecommendation, 20, yPosition);
        yPosition += splitRecommendation.length * lineHeight;
    });

    // PDF 저장
    doc.save(`${result.productName}_분석보고서.pdf`);
};

export const exportToExcel = (result: AnalysisResult) => {
    const workbook = XLSX.utils.book_new();

    // 기본 정보 시트
    const basicInfoData = [
        ['제품 분석 보고서'],
        [],
        ['기본 정보'],
        ['제품명', result.productName],
        ['카테고리', result.category],
        ['서브카테고리', result.subcategory],
        ['가격대', result.priceRange],
        ['타겟 시장', result.targetMarket],
        [],
        ['분석 결과'],
        ['시장 잠재력', result.analysis.marketPotential],
        ['경쟁 분석', result.analysis.competitionAnalysis],
        ['가격 전략', result.analysis.pricingStrategy],
        [],
        ['추천사항'],
    ];

    // 추천사항 추가
    result.analysis.recommendations.forEach((recommendation, index) => {
        basicInfoData.push([`${index + 1}. ${recommendation}`]);
    });

    const ws = XLSX.utils.aoa_to_sheet(basicInfoData);

    // 열 너비 설정
    const wscols = [
        { wch: 15 },  // A열
        { wch: 50 },  // B열
    ];
    ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(workbook, ws, '분석 결과');

    // 엑셀 파일 저장
    XLSX.writeFile(workbook, `${result.productName}_분석보고서.xlsx`);
}; 