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
        background: '#06090D',
        'background-secondary': '#0B1117',
        surface: '#101820',
        border: '#1E2933',
        primary: '#F1F5F9',
        secondary: '#94A3B8',
        accent: '#3B82F6',
        'secondary-accent': '#06B6D4',
        highlight: '#67E8F9',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
