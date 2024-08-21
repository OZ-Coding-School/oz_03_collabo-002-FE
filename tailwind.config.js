/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        primary: '#FFCD2A',
        black: '#222222',
        gray: '#d9d9d9',
        red: '#ff2727',
        darkgray: "979797",
      },
      backgroundColor: {
        primary: '#FFCD2A',
        black: '#222222',
        gray: '#d9d9d9',
        red: '#ff2727',
        darkgray: '#444',
      },
      fill: {
        primary: '#FFCD2A',
      },
      borderColor: {
        primary: '#FFCD2A',
      },
      boxShadow: {
        custom: '0px -4px 7.9px -2px #0000001F',
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
