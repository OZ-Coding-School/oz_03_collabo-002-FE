/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        primary: '#FFCD2A',
      },
      backgroundColor: {
        primary: '#FFCD2A',
      },
      fill: {
        primary: '#FFCD2A', // fill-primary 클래스 추가
      },
    },
  },
  plugins: [],
};
