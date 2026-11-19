import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        forest: "#244735",
        sage: "#A8B9A4",
        ivory: "#F7F6F0",
        stone: "#DFE1D8",
        charcoal: "#222822",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond Variable"', '"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans Variable"', '"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        page: "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
