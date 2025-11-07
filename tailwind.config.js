/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["'Inter'", "ui-sans-serif", "system-ui"],
      },
      colors: {
        evoblack: "#050507",
        evoidgo: "#12091f",
      },
      boxShadow: {
        luxe: "0 30px 60px -20px rgba(124, 58, 237, 0.35)",
      },
    },
  },
  plugins: [],
};
