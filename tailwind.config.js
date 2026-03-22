/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(217 91% 2%)",
        foreground: "hsl(210 40% 98%)",
        card: "hsl(217 71% 5%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
