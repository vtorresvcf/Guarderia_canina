/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['"Pacifico"'],
      },
      colors: {
        verdeOscuro: "#406940",
      },
    },
  },
  plugins: [],
};
