// src/types/analysis.ts

export type AnalysisType = 'market' | 'price' | 'competitor' | 'target' | 'trend' | 'risk';
export interface AnalysisStep {
  id: number;
  title: string;
  icon: string;
  color: string;
  description: string;
}

export interface AnalysisResult {
  stepId: number;
  data: any;
  recommendations: string[];
  actionItems: string[];
  completed: boolean;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  businessType: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  progress: {
    completedSteps: number[];
    currentStep: number;
  };
}
