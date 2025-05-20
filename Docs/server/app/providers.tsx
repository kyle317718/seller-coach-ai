'use client';

import { AnalysisProvider } from '@/contexts/AnalysisContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnalysisProvider>
      {children}
    </AnalysisProvider>
  );
} 