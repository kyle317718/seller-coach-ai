'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Types for our components
interface AnalysisStepProps {
  step: number;
  title: string;
  content: string;
  status: 'pending' | 'processing' | 'completed';
  result: string;
}

interface StatusIconProps {
  status: 'pending' | 'processing' | 'completed';
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

type StepStatus = 'pending' | 'processing' | 'completed';

interface AnalysisStep {
  title: string;
  content: string;
  status: StepStatus;
  result: string;
}

interface AnalysisState {
  steps: AnalysisStep[];
}

// Component definitions
const StatusIcon = ({ status }: StatusIconProps) => {
  if (status === 'completed') {
    return <span className="text-green-500">✓</span>;
  } else if (status === 'processing') {
    return <span className="text-blue-500 animate-spin">⟳</span>;
  }
  return <span className="text-gray-400">○</span>;
};

const initialAnalysisSteps: AnalysisStep[] = [
  {
    title: "시장 분석",
    content: "시장 규모, 트렌드, 경쟁 현황을 분석합니다.",
    status: 'pending',
    result: ''
  },
  {
    title: "제품 분석",
    content: "제품의 특성, 장단점, 차별화 요소를 분석합니다.",
    status: 'pending',
    result: ''
  },
  {
    title: "가격 전략",
    content: "적정 가격대와 수익성을 분석합니다.",
    status: 'pending',
    result: ''
  },
  {
    title: "마케팅 전략",
    content: "효과적인 마케팅 방안을 제시합니다.",
    status: 'pending',
    result: ''
  },
  {
    title: "실행 계획",
    content: "구체적인 실행 계획을 수립합니다.",
    status: 'pending',
    result: ''
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b last:border-b-0">
      <button
        className="w-full text-left py-4 px-6 focus:outline-none"
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <span className="font-medium">{question}</span>
          <span>{isOpen ? '−' : '+'}</span>
        </div>
        {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
      </button>
    </div>
  );
};

const HomePage = () => {
  // State management
  const [currentPage, setCurrentPage] = useState<'home' | 'analysis'>('home');
  const [textInput, setTextInput] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisState>({
    steps: initialAnalysisSteps
  });
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // FAQ data
  const faqData = [
    {
      question: "What information do I need to provide?",
      answer: "You need to provide a product description and an image of your product for the most accurate analysis."
    },
    {
      question: "How long does the analysis take?",
      answer: "The analysis typically takes about 2-3 minutes to complete all 8 steps thoroughly."
    },
    {
      question: "What kind of insights will I receive?",
      answer: "You will receive detailed insights about market trends, pricing strategy, target audience, competition analysis, and specific recommendations for your product."
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (analysisStatus.steps[currentStep].status === 'processing' && currentStep < analysisStatus.steps.length) {
      timer = setTimeout(() => {
        setAnalysisStatus(prevStatus => ({
          ...prevStatus,
          steps: prevStatus.steps.map((step, index) => ({
            ...step,
            status: index === currentStep ? 'processing' :
                    index < currentStep ? 'completed' : 'pending'
          }))
        }));
        
        setTimeout(() => {
          setAnalysisStatus(prevStatus => ({
            ...prevStatus,
            steps: prevStatus.steps.map((step, index) => ({
              ...step,
              status: index <= currentStep ? 'completed' : 'pending'
            }))
          }));
          setCurrentStep(prev => prev + 1);
        }, 2000);
      }, 500);
    }

    if (currentStep === analysisStatus.steps.length) {
      setAnalysisStatus(prevStatus => ({
        ...prevStatus,
        steps: prevStatus.steps.map(step => ({
          ...step,
          status: 'completed'
        }))
      }));
    }

    return () => clearTimeout(timer);
  }, [currentStep, analysisStatus.steps.length]);

  // Event handlers
  const handlePageChange = (page: 'home' | 'analysis') => {
    setCurrentPage(page);
  };

  const handleStartAnalysis = async () => {
    if (!textInput.trim()) {
      alert('제품명을 입력해주세요.');
      return;
    }

    setCurrentPage('analysis');
    
    // Initialize all steps as pending
    setAnalysisStatus(prev => ({
      steps: prev.steps.map(step => ({
        ...step,
        status: 'pending',
        result: ''
      }))
    }));

    try {
      // Process each step sequentially
      for (let stepIndex = 0; stepIndex < analysisStatus.steps.length; stepIndex++) {
        // Set current step to processing
        setAnalysisStatus(prev => ({
          steps: prev.steps.map((step, index) => ({
            ...step,
            status: index === stepIndex ? 'processing' :
                    index < stepIndex ? 'completed' : 'pending'
          }))
        }));

        // Call FastAPI server for analysis
        const response = await fetch('http://127.0.0.1:5001/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            product_name: textInput,
            step_index: stepIndex
          }),
        });

        if (!response.ok) {
          throw new Error(`분석 단계 ${stepIndex + 1}에서 오류가 발생했습니다: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Update step result
        setAnalysisStatus(prev => ({
          steps: prev.steps.map((step, index) => ({
            ...step,
            status: index === stepIndex ? 'completed' :
                    index === stepIndex + 1 ? 'processing' : 
                    index < stepIndex ? 'completed' : 'pending',
            result: index === stepIndex ? data.analysis : step.result
          }))
        }));

        // Wait between steps
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } catch (error: any) {
      console.error('Analysis error:', error);
      alert(`분석 중 오류가 발생했습니다: ${error.message}`);
      
      // Reset all steps to pending on error
      setAnalysisStatus(prev => ({
        steps: prev.steps.map(step => ({
          ...step,
          status: 'pending',
          result: ''
        }))
      }));
    }
  };

  if (currentPage === 'analysis') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Product Analysis</h1>
            <button
              onClick={() => handlePageChange('home')}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Back to Home
            </button>
          </div>
          <div className="space-y-4">
            {analysisStatus.steps.map((step, index) => (
              <AnalysisStepItem
                key={step.title}
                step={index + 1}
                title={step.title}
                content={step.content}
                status={step.status}
                result={step.result}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              AI Seller Coach
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get professional analysis and guidance for your product sales strategy
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Input Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-12">
          <div className="space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter your product description..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <button
              onClick={handleStartAnalysis}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start AI Analysis
            </button>
          </div>
        </div>

        {/* What's Different Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What's Different?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Comprehensive Analysis</h3>
              <p className="text-gray-600">Get detailed insights about market trends, competition, and customer behavior.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">AI-Powered Insights</h3>
              <p className="text-gray-600">Leverage advanced AI technology to analyze your product's potential.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Actionable Steps</h3>
              <p className="text-gray-600">Receive clear, practical recommendations for improving your sales strategy.</p>
            </div>
          </div>
        </div>

        {/* 8-Step Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">8-Step Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {analysisStatus.steps.map((step, index) => (
              <div key={step.title} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-xl font-semibold mb-2">Step {index + 1}</div>
                <h3 className="font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-sm">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisStepItem = ({ step, title, content, status, result }: AnalysisStepProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <StatusIcon status={status} />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default HomePage;
