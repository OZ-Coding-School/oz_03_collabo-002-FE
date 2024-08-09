/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        zero: '0',
      },
      textColor: {
        primary: '#FF4E2F',
      },
      backgroundColor: {
        primary: '#FF4E2F',
      },
    },
  },
  plugins: [],
};