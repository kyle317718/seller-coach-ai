interface AnalysisRecord {
  id: string;
  timestamp: Date;
  data: Record<string, any>;
}

const STORAGE_KEY = 'sellerCoachAnalysis';

export const saveAnalysis = (data: any): AnalysisRecord => {
  const record: AnalysisRecord = {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    data
  };
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...history, record]));
  return record;
};

export const loadAnalysisHistory = (): AnalysisRecord[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};
