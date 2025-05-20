'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/components/HomePage';
import { AnalysisPage } from '@/components/AnalysisPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header onNavigate={navigate} />
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'analysis' && <AnalysisPage />}
      </main>
      <Footer />
    </div>
  );
} 