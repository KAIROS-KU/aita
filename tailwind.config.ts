import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      neutral: {
        white: '#fff',
        black: '#1f1717',
        100: '#faf8f8',
        200: '#f6f4f4',
        300: '#f1ecec',
        400: '#dddcdc',
        500: '#a59797',
        600: '#8e8c8c',
        700: '#8e8c8c',
        transparent: 'rgba(0, 0, 0, 0.1)',
      },
      main: {
        red: '#ff5656',
        100: '#ffefef',
        500: '#ff6262',
        600: '#c7a7a7',
        700: '#734e4e',
      },
    },
    fontSize: {
      'h1-b-26': ['26px', { fontWeight: 'bold', lineHeight: 'normal', letterSpacing: 'normal' }],
      'h2-sb-24': ['24px', { fontWeight: '600', lineHeight: 'normal', letterSpacing: 'normal' }],
      'h1-b-20': ['20px', { fontWeight: 'bold', lineHeight: 'normal', letterSpacing: 'normal' }],
      'h2-sb-20': ['20px', { fontWeight: '600', lineHeight: 'normal', letterSpacing: 'normal' }],
      'h3-r-20': ['20px', { fontWeight: 'normal', lineHeight: 'normal', letterSpacing: 'normal' }],
      'h2-sb-18': ['18px', { fontWeight: '600', lineHeight: 'normal', letterSpacing: 'normal' }],
      'h3-m-18': ['18px', { fontWeight: '500', lineHeight: 'normal', letterSpacing: 'normal' }],
      'h2-sb-16': ['16px', { fontWeight: '600', lineHeight: 'normal', letterSpacing: 'normal' }],
      'h3-m-16': ['16px', { fontWeight: '500', lineHeight: '1.4', letterSpacing: 'normal' }],
      'body-r-16': ['16px', { fontWeight: 'normal', lineHeight: '1.4', letterSpacing: 'normal' }],
      'h3-m-14': ['14px', { fontWeight: '500', lineHeight: '1.4', letterSpacing: 'normal' }],
      'body-r-14': ['14px', { fontWeight: 'normal', lineHeight: '1.4', letterSpacing: 'normal' }],
      'h2-sb-12': ['12px', { fontWeight: '600', lineHeight: 'normal', letterSpacing: 'normal' }],
      'body-r-12': ['12px', { fontWeight: 'normal', lineHeight: '1.4', letterSpacing: 'normal' }],
    },
  },
  plugins: [],
};
export default config;
