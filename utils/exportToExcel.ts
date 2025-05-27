import * as XLSX from 'xlsx';

export function exportToExcel(title: string, content: string) {
  const ws = XLSX.utils.aoa_to_sheet([[title], [content]]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '분석결과');
  XLSX.writeFile(wb, `${title.replace(/\s+/g, '_')}.xlsx`);
}
