'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Competitor {
    name: string;
    price: number;
    sales: number;
    rating: number;
}

interface CompetitorTableProps {
    competitors: Competitor[];
    setCompetitors: (competitors: Competitor[]) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function CompetitorTable({ competitors, setCompetitors }: CompetitorTableProps) {
    const [csvError, setCsvError] = useState<string>('');

    const addRow = () => {
        setCompetitors([...competitors, { name: '', price: 0, sales: 0, rating: 0 }]);
    };

    const removeRow = (index: number) => {
        setCompetitors(competitors.filter((_, i) => i !== index));
    };

    const updateRow = (index: number, field: keyof Competitor, value: string | number) => {
        const newCompetitors = [...competitors];
        newCompetitors[index] = {
            ...newCompetitors[index],
            [field]: field === 'name' ? value : Number(value)
        };
        setCompetitors(newCompetitors);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // 파일 형식 검증
        if (!file.name.endsWith('.csv')) {
            setCsvError('CSV 파일만 업로드 가능합니다.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const rows = text.split('\n');
                const headers = rows[0].split(',');

                // 필수 컬럼 검증
                const requiredColumns = ['name', 'price', 'sales', 'rating'];
                const missingColumns = requiredColumns.filter(col => !headers.includes(col));
                if (missingColumns.length > 0) {
                    setCsvError(`필수 컬럼이 누락되었습니다: ${missingColumns.join(', ')}`);
                    return;
                }

                const data = rows.slice(1).map(row => {
                    const values = row.split(',');
                    return {
                        name: values[0] || '',
                        price: Number(values[1]) || 0,
                        sales: Number(values[2]) || 0,
                        rating: Number(values[3]) || 0
                    };
                });
                setCompetitors(data);
                setCsvError('');
            } catch (error) {
                console.error('CSV 파일 처리 중 오류:', error);
                setCsvError('CSV 파일 처리 중 오류가 발생했습니다.');
            }
        };
        reader.readAsText(file);
    };

    // 시장 점유율 데이터 계산
    const totalSales = competitors.reduce((sum, comp) => sum + comp.sales, 0);
    const marketShareData = competitors.map(comp => ({
        name: comp.name || '미입력',
        value: (comp.sales / totalSales) * 100
    }));

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {csvError && (
                        <p className="mt-1 text-sm text-red-500">{csvError}</p>
                    )}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={addRow}
                >
                    + 행 추가
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4 text-left font-medium">경쟁사명</th>
                                <th className="py-2 px-4 text-left font-medium">가격 (원)</th>
                                <th className="py-2 px-4 text-left font-medium">월 판매량</th>
                                <th className="py-2 px-4 text-left font-medium">별점 (5점)</th>
                                <th className="py-2 px-4 text-left font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {competitors.map((competitor, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">
                                        <input
                                            type="text"
                                            value={competitor.name}
                                            onChange={(e) => updateRow(index, 'name', e.target.value)}
                                            className="w-full p-1 border rounded"
                                            placeholder="경쟁사명"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="number"
                                            value={competitor.price}
                                            onChange={(e) => updateRow(index, 'price', e.target.value)}
                                            className="w-full p-1 border rounded"
                                            min="0"
                                            step="100"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="number"
                                            value={competitor.sales}
                                            onChange={(e) => updateRow(index, 'sales', e.target.value)}
                                            className="w-full p-1 border rounded"
                                            min="0"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input
                                            type="number"
                                            value={competitor.rating}
                                            onChange={(e) => updateRow(index, 'rating', e.target.value)}
                                            className="w-full p-1 border rounded"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeRow(index)}
                                            disabled={competitors.length === 1}
                                        >
                                            삭제
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="h-[300px]">
                    <h3 className="text-lg font-semibold mb-4">시장 점유율</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={marketShareData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                            >
                                {marketShareData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
} 