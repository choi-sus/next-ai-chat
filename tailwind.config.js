/** @type {import('tailwindcss').Config} */

const size0_100 = { ...Array.from(Array(101)).map((_, i) => `${i / 16}rem`) };
const size0_200 = { ...Array.from(Array(201)).map((_, i) => `${i / 16}rem`) };

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: size0_100,
      lineHeight: size0_100,
      borderRadius: size0_200,
      minWidth: size0_200,
      minHeight: size0_200,
      spacing: size0_200,
      colors: {
        primary: '#26D9FD',
        textDefault: '#FFFFFF',
        bgDefault: '#101010',
        bgPaper: '#1F1F1F',
      },
    },
  },
  plugins: [],
};
