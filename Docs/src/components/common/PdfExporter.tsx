import { jsPDF } from 'jspdf';

export const exportToPDF = (data: Record<string, any>, fileName: string) => {
  const doc = new jsPDF();
  
  doc.text('셀러코치.AI 분석 보고서', 10, 10);
  let yPosition = 20;
  
  Object.entries(data).forEach(([key, value]) => {
    doc.text(`${key}: ${JSON.stringify(value, null, 2)}`, 10, yPosition);
    yPosition += 10;
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 10;
    }
  });

  doc.save(`${fileName}.pdf`);
};
