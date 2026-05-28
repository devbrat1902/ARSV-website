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
        background: "var(--background)",
        foreground: "var(--foreground)",
        luxury: {
          ivory: "#FAF8F5",
          white: "#FCFBF9",
          gold: "#C5A880",
          goldLight: "#DFCEB7",
          goldDark: "#8E7544",
          onyx: "#1A1A1A",
          taupe: "#6E6E6E",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter-tight)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
