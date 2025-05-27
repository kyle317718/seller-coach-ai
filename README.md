# 셀러코치.AI

AI가 3분 만에 끝내주는 제품 분석 서비스

---

## 🏗️ 최신 Next.js 13+ App Router 적용 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── analysis/
│   │   └── page.tsx      # 분석 페이지
│   └── layout.tsx
├── components/
│   ├── AnalysisCard.tsx
│   └── Chart.tsx
└── data/
    └── analysisData.ts
```

---

## 🚀 주요 기능

- **분석 유형 7가지**: 시장, 가격, 경쟁사, 트렌드, 타겟, 리스크, 종합 보고서
- **입력 폼/유효성 검사/로딩/에러 처리**
- **분석 결과 PDF/Excel 내보내기**
- **반응형 UI, 공통 헤더/네비게이션**
- **API 연동(서버/AI 분석) 준비**
- **모던한 UX, 컴포넌트 기반 구조**

---

## 🛠️ 설치 및 실행 방법

### 1. 의존성 설치
```bash
cd client
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
- 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. (백엔드 서버 필요시)
```bash
cd ../server
npm install
npm run dev
```
- 서버는 보통 [http://localhost:5002](http://localhost:5002) 등에서 실행

---

## 📝 환경 변수(.env 예시)

```
DEEPSEEK_API_KEY=your_api_key_here
```

---

## 📦 주요 라이브러리

- React, Next.js, TypeScript, Tailwind CSS
- jsPDF, xlsx (PDF/Excel 내보내기)
- 기타: axios, express, dotenv 등

---

## 💡 기타

- **분석 유형/카테고리/플랫폼 추천 등 확장 가능**
- **코드/기능/디자인 개선 요청은 언제든 환영**

---

## 👨‍💻 문의/기여

- 추가 문의, 기능 요청, 버그 제보 등은 이슈로 남겨주세요!
