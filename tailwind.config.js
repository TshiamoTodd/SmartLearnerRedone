/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./context/**/*.{js,jsx,ts,tsx}",
  ],
  theme:{
    extend: {
      colors: {
        smartLearner: {
          darkBlue: '#012866',
          orange: '#ff7700',
          darkGray: "#161717",
          lightGray: "#d9dbdb",
        }
      }
    }
  },
  plugins: [],
}

