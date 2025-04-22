import { useState } from 'react';
import { Upload, Mic, CheckCircle2, Loader, AlertCircle } from 'lucide-react';

// 분석 상태 아이콘 컴포넌트
const StatusIcon = ({ status }: { status: 'pending' | 'inProgress' | 'completed' }) => {
  switch (status) {
    case 'pending':
      return <AlertCircle size={18} className="text-gray-400" />;
    case 'inProgress':
      return <Loader size={18} className="text-blue-500 animate-spin" />;
    case 'completed':
      return <CheckCircle2 size={18} className="text-green-500" />;
    default:
      return null;
  }
};

// 분석 단계 카드 컴포넌트
const AnalysisStepCard = ({ 
  step, 
  title, 
  content, 
  status 
}: { 
  step: number;
  title: string;
  content?: string;
  status: 'pending' | 'inProgress' | 'completed';
}) => (
  <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold text-gray-800">
        <span className="text-indigo-600 mr-2">{step}.</span>{title}
      </h3>
      <StatusIcon status={status} />
    </div>
    <div className="text-sm text-gray-600 space-y-2">
      {status === 'pending' && (
        <div className="space-y-2 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      )}
      {status === 'inProgress' && (
         <div className="space-y-2 animate-pulse">
           <div className="h-4 bg-blue-100 rounded w-full"></div>
           <div className="h-4 bg-blue-100 rounded w-5/6"></div>
         </div>
      )}
      {status === 'completed' && (
        <p>{content || "분석 결과가 여기에 표시됩니다."}</p>
      )}
    </div>
  </div>
);

export const AnalysisPage = () => {
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<Array<'pending' | 'inProgress' | 'completed'>>(
    Array(8).fill('pending')
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 이미지 파일 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  // 음성 입력 핸들러
  const handleVoiceInput = () => {
    alert('음성 입력 기능은 현재 개발 중입니다.');
  };

  // 분석 시작 핸들러
  const handleStartAnalysis = () => {
    if (!textInput && !imageFile) {
      alert('분석할 내용을 입력하거나 이미지를 업로드해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStatus(Array(8).fill('inProgress'));

    // 시뮬레이션: 각 단계를 순차적으로 완료
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < 8) {
        setAnalysisStatus(prevStatus => {
          const newStatus = [...prevStatus];
          newStatus[currentStep] = 'completed';
          return newStatus;
        });
        currentStep++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
      }
    }, 1000);
  };

  // 분석 단계 정의
  const analysisSteps = [
    { step: 1, title: "상품 예측", content: "Google Trends, DeepSeek 분석 결과 기반 추천 카테고리 및 아이템 제시.", status: analysisStatus[0] },
    { step: 2, title: "사입/위탁 안내", content: "추천 상품 관련 도매처 정보, 예상 마진율 계산, 주요 위탁 판매 플랫폼 정보 제공.", status: analysisStatus[1] },
    { step: 3, title: "판매 전 준비", content: "필요 인증 확인, 상품 포장 및 배송 옵션, 고객 응대 체크리스트 제공.", status: analysisStatus[2] },
    { step: 4, title: "시장성 분석", content: "예상 시장 규모, 연간 성장률, 계절성 상품 여부 분석.", status: analysisStatus[3] },
    { step: 5, title: "고객 분석", content: "주요 타겟 고객층, 고객 구매 여정 시나리오, 핵심 구매 결정 요인 분석.", status: analysisStatus[4] },
    { step: 6, title: "경쟁 분석", content: "주요 경쟁사 분석, 시장 내 경쟁 강도 평가, 차별화 전략 포인트 제안.", status: analysisStatus[5] },
    { step: 7, title: "상세페이지 개선", content: "현재 페이지 분석 기반 문구/이미지 개선 제안, 필수 포함 요소 체크.", status: analysisStatus[6] },
    { step: 8, title: "마케팅 전략", content: "추천 광고 채널, 타겟 키워드 제안, 광고 예산 설정 가이드 제공.", status: analysisStatus[7] },
  ];

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* 입력 섹션 */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">분석할 상품 정보 입력 <span role="img" aria-label="돋보기">🔍</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 텍스트 입력 */}
          <div className="md:col-span-2">
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">상품명 또는 설명</label>
            <textarea
              id="text-input"
              rows={4}
              placeholder="분석하고 싶은 상품명, 카테고리, 또는 간단한 설명을 입력하세요."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={isAnalyzing}
            ></textarea>
          </div>

          {/* 이미지 및 음성 입력 */}
          <div className="space-y-4">
            {/* 이미지 업로드 */}
            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">상품 이미지 (선택)</label>
              <div className="flex items-center space-x-2">
                <label htmlFor="image-upload" className={`flex-grow cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm p-2 rounded-lg border border-gray-300 text-center transition duration-300 ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <Upload size={16} className="inline-block mr-1"/> {imageFile ? imageFile.name : '이미지 선택'}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isAnalyzing}
                />
              </div>
            </div>

            {/* 음성 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">음성으로 설명하기 (선택)</label>
              <button
                onClick={handleVoiceInput}
                disabled={isAnalyzing}
                className={`w-full flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm p-2 rounded-lg border border-blue-300 transition duration-300 ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Mic size={16} className="mr-1"/> 음성 입력 시작
              </button>
            </div>
          </div>
        </div>

        {/* 분석 시작 버튼 */}
        <div className="mt-6 text-center">
          <button
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'transform hover:-translate-y-1'}`}
          >
            {isAnalyzing ? (
              <>
                <Loader size={20} className="inline-block mr-2 animate-spin" /> 분석 진행 중...
              </>
            ) : (
              'AI 분석 시작하기'
            )}
          </button>
        </div>
      </section>

      {/* 출력 섹션 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">분석 결과 <span role="img" aria-label="차트">📊</span></h2>
        {isAnalyzing || analysisStatus.some(s => s !== 'pending') ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysisSteps.map((item) => (
              <AnalysisStepCard
                key={item.step}
                step={item.step}
                title={item.title}
                content={item.content}
                status={item.status}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
            <p>상품 정보를 입력하고 'AI 분석 시작하기' 버튼을 누르면 결과가 여기에 표시됩니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}; 