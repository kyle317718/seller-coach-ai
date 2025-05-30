import { MarketAnalysis } from '../data/analysisData';
import { db } from './firebase';

export const saveAnalysis = async (data: MarketAnalysis) => {
  // 임시 저장 로직 (실제 DB 연동 전용)
  return Promise.resolve({ success: true, data });
};
