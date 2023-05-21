/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "header-image":
          "url('https://images.unsplash.com/photo-1628432136678-43ff9be34064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=363&q=100')",
        "backgroundPosition": {
          "bottom": "bottom",
          "bottom-4": "center bottom 1rem",
          "center": "center ",
          "left": "left",
          "left-bottom": "left bottom",
          "left-top": "left top",
          "right": "right",
          "right-bottom": "right bottom",
          "right-top": "right top",
          "top": "top",
          "top-4": "center top 1rem",
        },
      },
    },
  },
  plugins: [],
};
