"use client";
interface Props {
  title: string;
  description: string;
  onClick: () => void;
  order?: number;
  onStart?: () => void;
  [key: string]: any;
}

export default function AnalysisCard({ title, description, onClick, order, onStart, ...rest }: Props) {
  return (
    <div 
      onClick={onClick}
      className="border p-6 rounded-xl cursor-pointer hover:shadow-md transition-all"
      {...rest}
    >
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-600 hover:underline">
        분석 시작 →
      </button>
    </div>
  );
}
