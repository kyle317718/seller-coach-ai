/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B2B', // 주황색 (CTA)
          hover: '#FF8F5C',
          light: '#FFE4D9',
        },
        trust: {
          DEFAULT: '#2C5530', // 딥그린 (신뢰도)
          hover: '#3A703F',
          light: '#E8F5E9',
        }
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        noto: ['Noto Sans KR', 'sans-serif'],
      },
      fontSize: {
        'title': ['20px', {
          fontWeight: '700',
          lineHeight: '1.4',
        }],
        'body': ['16px', {
          fontWeight: '300',
          lineHeight: '1.6',
        }],
      },
    },
  },
  plugins: [],
}

