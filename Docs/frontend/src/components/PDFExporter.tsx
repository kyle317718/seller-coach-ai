import { usePDF } from 'react-to-pdf';

export default function PDFExporter() {
  const { toPDF } = usePDF();
  return <button onClick={() => toPDF()}>PDF 출력</button>;
}
