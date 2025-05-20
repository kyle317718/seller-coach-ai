'use client';

import React, { createContext, useContext, useState } from 'react';

interface AnalysisState {
  isAnalyzing: boolean;
  progress: number;
  currentStep: string;
  result: any;
}

interface AnalysisContextType {
  state: AnalysisState;
  startAnalysis: () => void;
  updateProgress: (progress: number, step: string) => void;
  setResult: (result: any) => void;
  completeAnalysis: () => void;
}

const initialState: AnalysisState = {
  isAnalyzing: false,
  progress: 0,
  currentStep: '',
  result: null,
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AnalysisState>(initialState);

  const startAnalysis = () => {
    setState({
      ...initialState,
      isAnalyzing: true,
    });
  };

  const updateProgress = (progress: number, step: string) => {
    setState(prev => ({
      ...prev,
      progress,
      currentStep: step,
    }));
  };

  const setResult = (result: any) => {
    setState(prev => ({
      ...prev,
      result,
    }));
  };

  const completeAnalysis = () => {
    setState(prev => ({
      ...prev,
      isAnalyzing: false,
      progress: 100,
    }));
  };

  return (
    <AnalysisContext.Provider
      value={{
        state,
        startAnalysis,
        updateProgress,
        setResult,
        completeAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
} 