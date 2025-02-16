/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0061EF",
        primaryOrange: "#FFA500",
        primaryYellow: "#FFCE01",
        lightGray: "#D1D6E2",
        lightGray2: "B8B8B8",
        darkGray: "#404040",
        mediumGray: "#898B90",
        lightWhite: "#FAF6F3",
        globalBackground: "#FAF6F3",
        lightOrange: "#FADFC9",
        pearlBush: "#DBCEC4",
        lightPearl: "#F3EDE8",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 5s infinite',
      },
    },
  },
  plugins: [],
};
