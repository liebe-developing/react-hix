/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5c6ac4",
        secondary: "#ecc94b",
        light: "#33fcff",
      },
      backgroundImage: {
        bgChat: "url(/src/assets/bgchat.png)",
      },
    },
  },
  plugins: [],
};
