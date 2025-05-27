import jsPDF from 'jspdf';

export function exportToPDF(title: string, content: string) {
  const doc = new jsPDF();
  doc.setFont('helvetica');
  doc.setFontSize(18);
  doc.text(title, 10, 20);
  doc.setFontSize(12);
  doc.text(content, 10, 35);
  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}
