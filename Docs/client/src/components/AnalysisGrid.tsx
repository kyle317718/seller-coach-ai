import { ANALYSIS_DATA } from '../data/analysisData';
import AnalysisCard from './AnalysisCard';

export default function AnalysisGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ANALYSIS_DATA.map((item) => (
        <AnalysisCard
  key={item.id}
  title={item.name}
  description={item.description}
  onClick={() => {}}
/>
      ))}
    </div>
  );
}
