import TrendStep from '@/components/analysis/TrendStep';

export default function TestPage() {
  return (
    <div className="p-8">
      <TrendStep onComplete={(data) => console.log(data)} />
    </div>
  );
}
