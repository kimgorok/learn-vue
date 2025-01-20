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
          1: '#0C0C0C',
          2: '#313030',
        },
        gray: {
          0: '#51525B',
          1: '#959393',
        },
        primary: {
          0: '#232D64',
          1: '#223F59',
        },
        white: {
          0: '#FFFFFF',
          1: '#F9F7FD',
          2: '#FAFAFA',
        },
        blue: {
          0: '#2E2E48',
          1: '#5D5D9D',
        },
        // dark: {
        //   bg: '#121212',
        //   surface: '#1E1E1E',
        //   border: '#2E2E2E',
        //   text: {
        //     primary: '#FFFFFF',
        //   },
        // },
      },
    },
  },
};
export default config;
