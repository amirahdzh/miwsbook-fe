/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    container:{
      center: true,
      padding: '16px'
    },
    extend: {
      colors:{
        primary: "#14b8a6", // Teal-500
        secondary: '#64748b',
        dark: '#0f172a'
      },
      textColor: {
        DEFAULT: '#000000',
      },
      screens:{
        '2xl': '1320px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        dellarespira: ['Della Respira', 'serif'],
      },
    },
  },
  plugins: [],
}
