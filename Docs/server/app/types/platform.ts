import { ReactNode } from 'react';

export interface TimelineStep {
  title: string;
  duration: string;
  description: string;
}

export interface PlatformGuide {
  fees: {
    commission: string;
    delivery: string;
  };
  requirements: string[];
  customs: string[];
  documents: string[];
}

export interface PlatformData {
  key: string;
  name: string;
  icon: ReactNode;
  guide: PlatformGuide;
  timeline: TimelineStep[];
} 