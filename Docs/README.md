# Trae AI MVP Project

## 프로젝트 개요
제품 분석을 위한 AI 기반 웹 애플리케이션입니다.

## 기술 스택
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- PostCSS
- IndexedDB (with localStorage fallback)
- html-to-image & jsPDF

## 주요 기능

### 1. 디자인 시스템
- 통일된 색상 시스템 (주 색상: #FF6B00)
- 반응형 디자인 (320px ~ 768px 최적화)
- 접근성이 고려된 아이콘 시스템
- 일관된 타이포그래피와 여백

### 2. 데이터 관리
- IndexedDB를 통한 데이터 영속성
- localStorage 폴백 지원
- 자동 저장 기능

### 3. 분석 기능
- 7가지 분석 유형 지원
  - 시장 분석 (TAM/SAM)
  - 리스크 분석
  - 트렌드 분석
  - 타겟 분석
  - 가격 분석
  - 경쟁사 분석
  - 전략 분석
- 진행률 표시 시스템
- 신뢰도 지표 표시

### 4. 문서화
- 고해상도 PDF 출력 (300 DPI)
- A4 크기 최적화
- 차트 및 이미지 포함 지원

## 구현된 컴포넌트

### 1. UI 컴포넌트
```typescript
// ProgressBar
interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

// Icon
interface IconProps {
    icon: string;
    label: string;
    className?: string;
}
```

### 2. 유틸리티

#### PDF 생성
```typescript
interface PDFGenerationOptions {
    filename?: string;
    resolution?: number;
    margin?: number;
}
```

#### 데이터 저장소
```typescript
interface StorageOptions {
    dbName?: string;
    storeName?: string;
    version?: number;
}
```

## 아이콘 시스템

### 분석 유형별 아이콘
```typescript
const ANALYSIS_ICONS = {
    market: "📈",    // 시장 분석
    risk: "⚠️",     // 리스크 분석
    trend: "📊",    // 트렌드 분석
    target: "🎯",   // 타겟 분석
    pricing: "💰",  // 가격 분석
    competitor: "🥊", // 경쟁사 분석
    strategy: "🎮"  // 전략 분석
}
```

### 섹션별 아이콘
```typescript
const SECTION_ICONS = {
    market: {
        size: "📊",       // 시장 규모
        growth: "📈",     // 성장률
        barrier: "🚧"     // 진입 장벽
    },
    // ... 기타 섹션
}
```

## 시작하기

1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
cd Docs/client; image.pngnpm start
```

3. 브라우저에서 확인
```
http://localhost:3000
```

## 향후 개선 계획

### 1. UI/UX
- [ ] 다크 모드 지원
- [ ] 분석 완료 시 Confetti 효과
- [ ] 토스트 메시지 시스템

### 2. 성능
- [ ] 이미지 최적화
- [ ] 컴포넌트 렌더링 최적화
- [ ] 데이터 캐싱 전략

### 3. 접근성
- [ ] ARIA 레이블 보강
- [ ] 키보드 네비게이션 개선
- [ ] 고대비 모드 지원

### 4. 데이터 관리
- [ ] 오프라인 모드 지원
- [ ] 데이터 백업/복원
- [ ] 동기화 시스템

## 라이선스
MIT License

## 목표 폴더 구조
```
trae_ai_mvp/
├── app/
│   ├── layout.tsx                # 공통 레이아웃
│   ├── page.tsx                  # 메인 홈페이지 (Home)
│   ├── product-analysis/         # 분석 페이지
│   │   └── page.tsx              # 분석 기능 메인 페이지
│
├── components/                   # 공통/재사용 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HomePage.tsx              # 메인 랜딩 내용
│   ├── ProductAnalysis.tsx       # 분석 기능 Wrapper
│   ├── AnalysisForm.tsx          # 분석 입력 폼
│   ├── AnalysisSteps.tsx         # 분석 진행 단계 UI
│   └── ResultView.tsx            # 분석 결과 UI
│
├── public/                       # 이미지, 로고 등 정적 파일
├── styles/
│   └── globals.css               # Tailwind 포함 전역 스타일
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## 주요 설정 완료 사항

### 1. Tailwind CSS 설정
- `tailwind.config.js` 설정 완료
- 컨텐츠 경로 설정: `app`, `pages`, `components` 디렉토리 포함
- 테마 확장 및 플러그인 설정

### 2. PostCSS 설정
- `postcss.config.js` 설정 완료
- tailwindcss 및 autoprefixer 플러그인 설정

### 3. 클라이언트 컴포넌트 설정
다음 컴포넌트들에 'use client' 지시어 추가 완료:
- ProductAnalysis.tsx (useState 사용)
- AnalysisForm.tsx (useState 사용)
- AnalysisSteps.tsx
- ResultView.tsx

## 구현 상태

### 완료된 작업
- [x] Tailwind CSS 및 PostCSS 설정
- [x] 기본 컴포넌트 구조 설정
- [x] 클라이언트 컴포넌트 'use client' 지시어 추가

### 진행 중인 작업
1. 홈페이지 기본 틀 설정
```tsx
// app/page.tsx
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/components/HomePage';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-8">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
```

2. 분석 페이지 설정
```tsx
// app/product-analysis/page.tsx
'use client';
import { ProductAnalysis } from '@/components/ProductAnalysis';

export default function ProductAnalysisPage() {
  return (
    <div className="p-4">
      <ProductAnalysis />
    </div>
  );
}
```

### 남은 작업
- [ ] app/product-analysis/page.tsx 생성
- [ ] Header.tsx에 메뉴 링크 추가
```tsx
<nav className="flex gap-4">
  <Link href="/">홈</Link>
  <Link href="/product-analysis">제품 분석</Link>
</nav>
```

## 컴포넌트 구조

### ProductAnalysis
- 메인 분석 컴포넌트
- 상태 관리: analysisState (useState)
- 하위 컴포넌트:
  - AnalysisForm
  - AnalysisSteps
  - ResultView

### AnalysisForm
- 제품 분석을 위한 입력 폼
- 입력 필드:
  - 제품명
  - 타겟 시장
  - 가격대
  - 카테고리

### AnalysisSteps
- 분석 단계 표시
- 상태별 시각적 표시:
  - pending
  - processing
  - completed
  - error

### ResultView
- 분석 결과 표시
- 내보내기 기능 (PDF, Excel)

## API 엔드포인트
- 분석 API: `http://127.0.0.1:5001/api/analyze`
  - Method: POST
  - 요청 데이터: 제품 정보 및 단계 정보
  - 응답: 분석 결과

# 셀러코치.AI

## 현재 서버 상태 (2024-02-29)

### 프론트엔드 서버
- 포트: 3000
- 엔진: Next.js 15.3.1 (Turbopack)
- URL: http://localhost:3000
- 네트워크 URL: http://192.168.35.18:3000

### 백엔드 서버
- 포트: 5002
- URL: http://localhost:5002
- 환경변수 요구사항: DEEPSEEK_API_KEY

## 서버 실행 방법

1. 프론트엔드 서버 실행:
```bash
# 프로젝트 루트 디렉토리에서
npm run dev
```

2. 백엔드 서버 실행:
```bash
# server 디렉토리에서
node index.js
```

## 구현된 페이지 목록
- /
- /analysis
- /analysis/trend
- /analysis/market
- /analysis/competition
- /analysis/target
- /analysis/pricing
- /analysis/marketing
- /analysis/report 