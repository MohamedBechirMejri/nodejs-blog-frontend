/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        reveal: "reveal 0.3s ease-in-out forwards",
        hide: "hide 0.3s ease-in-out forwards",
      },
      keyframes: {
        reveal: {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, 300%)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%, -50%)",
          },
        },
        hide: {
          "0%": {
            opacity: 1,
            transform: "translate(-50%, -50%)",
          },
          "100%": {
            opacity: 0,
            transform: "translate(-50%, 300%)",
          },
        },
      },
    },
  },
  plugins: [],
};
