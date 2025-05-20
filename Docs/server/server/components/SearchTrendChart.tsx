import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SearchTrendChartProps {
    data?: {
        month: string;
        value: number;
    }[];
}

export const SearchTrendChart = ({ data = [
    { month: '1월', value: 120 },
    { month: '2월', value: 180 },
    { month: '3월', value: 210 }
] }: SearchTrendChartProps) => {
    return (
        <div className="w-full h-[300px] bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">강아지 자동 급수기 검색량 추이</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ff6b6b"
                        strokeWidth={2}
                        dot={{ fill: '#ff6b6b' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}; 