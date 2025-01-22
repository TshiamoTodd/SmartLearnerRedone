/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./context/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        green: { 500: '#10b981', 200: '#d1fae5' },
        red: { 500: '#ef4444', 200: '#fecaca' },
        purple: { 500: '#8b5cf6' },
    },
    },
  },
  plugins: [],
}

