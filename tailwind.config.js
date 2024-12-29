/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'crypto-green': '#00ff88',
        'crypto-red': '#ff3358',
      }
    },
  },
  plugins: [],
};