/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        primary: '#FFCD2A',
        black: '#222222',
        gray: '#c1c1c1',
        red: '#ff2727',
        darkgray: "979797",
      },
      backgroundColor: {
        primary: '#FFCD2A',
        black: '#222222',
        gray: '#d9d9d9',
        red: '#ff2727',
        darkgray: "#979797",
      },
      fill: {
        primary: '#FFCD2A', // fill-primary 클래스 추가
      },
    },
    fontFamily: {
      sans: ['NanumSquare', 'ui-sans-serif', 'system-ui'],
      nanum: [
        'NanumSquare',
        'NanumSquareLight',
        'NanumSquareBold',
        'NanumSquareExtraBold',
        'sans-serif',
      ],
    },
  },
  plugins: [],
};
