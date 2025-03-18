/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#F48FB1", // Blush Pink
        secondary: "#CCCCCC", // Slightly Darker Dove Gray
        dark: "#333333", // Charcoal Gray
        background: "#FAF9F9", // Off-White
        hover: "#FFD7C2", // Soft Peach
        link: "#B5838D", // Muted Mauve
      },
      textColor: {
        DEFAULT: "#444444", // Slightly Dark Gray
        heading: "#333333", // Charcoal Gray
      },
      borderColor: {
        DEFAULT: "#E5E5E5", // Soft Dove Gray
      },
    },
  },
};

export default config;
