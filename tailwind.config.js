import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      sm: "575px",
      md: "768px",
      lg: "1025px",
      xl: "1202px",
    },
    fontFamily: {
      display: ['"CalSans-SemiBold"', "sans-serif"],
      body: ['"DM Sans"', "sans-serif"],
    },
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      accent: "#8358FF",
      "accent-dark": "#7444FF",
      "accent-light": "#9E7CFF",
      "accent-lighter": "#B9A0FF",
      "light-base": "#F5F8FA",
      green: "#10b981",
      orange: "#FEB240",
      red: "#EF4444",
      blue: "#428AF8",
      jacarta: {
        base: "#5A5D79",
        50: "#F4F4F6",
        100: "#E7E8EC",
        200: "#C4C5CF",
        300: "#A1A2B3",
        400: "#7D7F96",
        500: "#5A5D79",
        600: "#363A5D",
        700: "#131740",
        800: "#101436",
        900: "#0D102D",
      },
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "normal" }],
      "2xs": ["0.8125rem", { lineHeight: "normal" }],
      sm: ["0.875rem", { lineHeight: "normal" }],
      base: ["1rem", { lineHeight: "normal" }],
      lg: ["1.25rem", { lineHeight: "normal" }],
      xl: ["1.5rem", { lineHeight: "normal" }],
      "2xl": ["1.75rem", { lineHeight: "normal" }],
      "3xl": ["2rem", { lineHeight: "normal" }],
      "4xl": ["2.25rem", { lineHeight: "normal" }],
      "5xl": ["2.5rem", { lineHeight: "normal" }],
      "6xl": ["3.5rem", { lineHeight: "normal" }],
      "7xl": ["4.25rem", { lineHeight: "normal" }],
    },
    extend: {
      borderRadius: {
        "2lg": "0.625rem",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      animation: {
        fly: "fly 6s cubic-bezier(0.75, 0.02, 0.31, 0.87) infinite",
        heartBeat: "heartBeat 1s cubic-bezier(0.75, 0.02, 0.31, 0.87) infinite",
        progress: "progress 5s linear",
      },
      keyframes: {
        fly: {
          "0%, 100%": { transform: "translateY(5%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
