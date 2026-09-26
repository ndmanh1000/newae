import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f2f7f4",
          100: "#e1ede5",
          200: "#c4dcce",
          300: "#9ec2af",
          400: "#74a48c",
          500: "#53886f",
          600: "#3d6d56",
          700: "#315745",
          800: "#274538",
          900: "#1b3329",
          950: "#0e1f18",
        },
        coral: {
          DEFAULT: "#E55B38",
          hover: "#cf4c2a",
          light: "#FDF1EE",
        },
        cream: {
          50: "#FCFAF6",
          100: "#F8F5EE",
          200: "#F0EAE0",
          300: "#E6DDCD",
        },
        sage: {
          50: "#F4F7F4",
          100: "#E5ECE5",
          200: "#CCE0CC",
          500: "#2E7D32",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 10px 30px -10px rgba(27, 51, 41, 0.08)",
        hover: "0 20px 40px -15px rgba(27, 51, 41, 0.14)",
        glow: "0 0 25px -5px rgba(240, 106, 71, 0.5)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(1.5deg)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(14px) rotate(-1.5deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(240, 106, 71, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(240, 106, 71, 0.65)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.08)" },
          "66%": { transform: "translate(-25px, 25px) scale(0.94)" },
        },
        "blob-reverse": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(-30px, 35px) scale(1.06)" },
          "66%": { transform: "translate(25px, -20px) scale(0.95)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX(250%) skewX(-20deg)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "float-reverse": "float-reverse 8s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        "blob-reverse": "blob-reverse 14s ease-in-out infinite",
        shimmer: "shimmer 2.8s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
