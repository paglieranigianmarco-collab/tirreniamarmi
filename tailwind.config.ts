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
        cream: {
          DEFAULT: "#FAF8F5",
          dark: "#F0ECE6",
        },
        stone: {
          light: "#E8E0D5",
          DEFAULT: "#C4B8A8",
          dark: "#8C7B6B",
        },
        charcoal: {
          light: "#4A4A4A",
          DEFAULT: "#1C1C1C",
          dark: "#0A0A0A",
        },
        gold: {
          light: "#D4B896",
          DEFAULT: "#B8956A",
          dark: "#8C6B3F",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": [
          "clamp(3.5rem, 8vw, 8rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "clamp(2.5rem, 6vw, 6rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 4.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.5rem, 3vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        site: "1440px",
      },
      aspectRatio: {
        portrait: "3 / 4",
        landscape: "4 / 3",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
