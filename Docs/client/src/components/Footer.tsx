import { MapPin, Phone, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-gray-100 text-gray-700 py-12 mt-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 회사 정보 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">셀러코치.AI</h3>
          <p className="text-sm mb-2"><MapPin size={14} className="inline-block mr-1"/> 주소: [회사 주소]</p>
          <p className="text-sm mb-2"><Phone size={14} className="inline-block mr-1"/> 문의: [연락처]</p>
          <p className="text-sm"><Mail size={14} className="inline-block mr-1"/> 이메일: [이메일 주소]</p>
        </div>
        {/* 바로가기 링크 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">바로가기</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600 transition duration-300">서비스 소개</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition duration-300">분석 기능</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition duration-300">FAQ</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition duration-300">고객 후기</a></li>
          </ul>
        </div>
        {/* 법적 고지 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">약관 및 정책</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600 transition duration-300">개인정보처리방침</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition duration-300">서비스 이용약관</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition duration-300">데이터 처리 안내</a></li>
          </ul>
        </div>
        {/* 소셜 미디어 및 뉴스레터 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">소식 받기</h3>
          <p className="text-sm mb-3">뉴스레터를 구독하고 최신 정보를 받아보세요.</p>
          <div className="flex mb-4">
            <input type="email" placeholder="이메일 주소 입력" className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-r-lg transition duration-300">구독</button>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-300"><Twitter size={20}/></a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-300"><Facebook size={20}/></a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-300"><Instagram size={20}/></a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-300"><Linkedin size={20}/></a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition duration-300">오픈채팅</a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} 셀러코치.AI. All rights reserved.
      </div>
    </div>
  </footer>
); 