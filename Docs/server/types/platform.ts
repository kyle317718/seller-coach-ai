export type PlatformKey = 'coupang' | 'naver' | 'eleven';

export interface PlatformGuide {
  name: string;
  fees: {
    commission: string;
    delivery: string;
    other?: string;
  };
  requirements: string[];
  customs: string[];
  documents: string[];
  timeline: {
    step: string;
    duration: string;
  }[];
}

export interface PlatformData {
  key: PlatformKey;
  name: string;
  icon: React.ComponentType;
  guide: PlatformGuide;
} 