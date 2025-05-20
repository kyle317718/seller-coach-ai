import jsPDF from 'jspdf';

export function exportToPdf(title: string, content: string) {
  const doc = new jsPDF();
  doc.setFont('helvetica');
  doc.setFontSize(18);
  doc.text(title, 20, 20);
  doc.setFontSize(12);
  doc.text(content, 20, 40);
  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}
