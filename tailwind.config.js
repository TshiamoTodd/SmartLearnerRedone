/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./context/**/*.{js,jsx,ts,tsx}",
    "./app/(dashboard)/subject/[id]/(quiz)/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
}

