/** @type {import('tailwindcss').Config} */

import { Container } from "postcss";

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "320px",
      xs: "567px",

      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
