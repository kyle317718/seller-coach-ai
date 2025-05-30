import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="text-xl font-bold text-primary-600 mb-4">셀로코치.AI</div>
            <p className="text-gray-600 text-sm">
              초보 셀러들의 성공적인 온라인 판매를 위한 최고의 파트너입니다. 아이템 추천부터 마켓 분석, 판매 전략까지 모든 것을 제공합니다.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              서비스
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/item-recommendation" className="text-gray-600 hover:text-primary-600 text-sm">
                  아이템 추천
                </Link>
              </li>
              <li>
                <Link href="/market-analysis" className="text-gray-600 hover:text-primary-600 text-sm">
                  마켓 분석
                </Link>
              </li>
              <li>
                <Link href="/sales-strategy" className="text-gray-600 hover:text-primary-600 text-sm">
                  판매 전략
                </Link>
              </li>
              <li>
                <Link href="/business-guide" className="text-gray-600 hover:text-primary-600 text-sm">
                  사업 가이드
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              지원
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-600 text-sm">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600 text-sm">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">
                  개인정보 처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600 text-sm">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              뉴스레터 구독
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              최신 온라인 판매 트렌드와 팁을 받아보세요.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="이메일 주소"
                className="input-field"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                구독하기
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} 셀로코치.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
