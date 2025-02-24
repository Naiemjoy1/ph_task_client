import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: "'Open Sans', sans-serif ",
        Playfair: "'Playfair Display', serif",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6fbf43",
          secondary: "#2b8c69",
          accent: "#FFD700",
          neutral: "#0d1224",
          "base-100": "#ffffff",
        },
      },
      "light",
      "synthwave",
    ],
  },
};
