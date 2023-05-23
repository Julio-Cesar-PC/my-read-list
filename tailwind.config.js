/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D3557",
        primaryLight: "#254672",
        primaryDark: "#192C47"
      },
    },
  },
  plugins: [],
}

