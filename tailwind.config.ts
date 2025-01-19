import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      lg: "1024px",
    },
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        black: {
          0: "#000000",
        },
        gray: {
          0: "#6E6E82",
          1: "#9FA6B2",
          2: "#D2D2D2",
          3: "#A6A6A6",
          4: "#F3F3F3",
          5: "#D9D9D9",
        },
        blue: {},
        white: {},
        primary: {},
        yellow: {},
        pink: {},
        red: {},
        green: {},
      },
    },
  },
};
export default config;
