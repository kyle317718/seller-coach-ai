import { exportToPDF } from '../utils/exportToPDF';
import { exportToExcel } from '../utils/exportToExcel';

export default function ExportButton({ title = '분석 결과', content = '', disabled = false }: { title?: string; content?: string; disabled?: boolean }) {
  return (
    <div className="flex gap-4 mt-8">
      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
        onClick={() => exportToPDF(title, content)}
        disabled={disabled}
      >
        PDF로 내보내기
      </button>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        onClick={() => exportToExcel(title, content)}
        disabled={disabled}
      >
        Excel로 내보내기
      </button>
    </div>
  );
}
