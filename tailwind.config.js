/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['Roboto', 'sans-serif'],
        body: ['Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        primary: '#03045e',
        secondary: '#2a2a2a',
      },
    },
  },
  plugins: [],
}