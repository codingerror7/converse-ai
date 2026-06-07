/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        surface: '#111214',
        'surface-elevated': '#17181C',
        border: '#26282E',
        primary: '#F5F5F7',
        secondary: '#A0A3AD',
        accent: '#7C5CFF',
        success: '#2ED47A',
        warning: '#FFB547',
        error: '#FF6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
