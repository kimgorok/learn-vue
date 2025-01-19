import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Vue 파일 경로로 수정
  ],
  theme: {
    screens: {
      lg: '1024px',
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        black: {
          0: '#000000',
        },
        gray: {
          0: '#6E6E82',
          1: '#9FA6B2',
          2: '#D2D2D2',
          3: '#A6A6A6',
          4: '#F3F3F3',
          5: '#D9D9D9',
        },
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          border: '#2E2E2E',
          text: {
            primary: '#FFFFFF',
          },
        },
      },
    },
  },
};
export default config;
