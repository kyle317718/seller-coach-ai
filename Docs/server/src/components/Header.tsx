import React from 'react';
import { Menu, LogIn } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => onNavigate('home')}>
        셀러코치.AI <span role="img" aria-label="코치">🚀</span>
      </div>
      <div className="space-x-4">
        <button
          onClick={() => onNavigate('home')}
          className="text-gray-600 hover:text-indigo-600 transition duration-300"
        >
          홈
        </button>
        <button
          onClick={() => onNavigate('analysis')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          분석 시작하기
        </button>
      </div>
    </nav>
  </header>
); 