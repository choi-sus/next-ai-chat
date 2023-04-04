/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
