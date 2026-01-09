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
        // Neutral colors from Figma
        neutral: {
          0: "#FFFFFF",
          100: "#F7F7F7",
          200: "#EDEDED",
          400: "#A3A7AE",
          500: "#8C909A",
          900: "#182235",
        },
        // Primary colors
        primary: {
          dark: "#101828",
          gray: "#4A5565",
        },
        // Text colors
        text: {
          tertiary: "#6A7282",
        },
        // Background
        background: "#FBFAF9",
      },
      fontFamily: {
        heading: ['"IBM Plex Mono"', "monospace"],
        body: ["Manrope", "sans-serif"],
      },
      fontSize: {
        "heading-1": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-4": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "body-2": ["16px", { lineHeight: "1.3", fontWeight: "400" }],
        "body-4": ["12px", { lineHeight: "18px", fontWeight: "400" }],
      },
      spacing: {
        "xs": "5px",
        "sm": "10px",
        "md": "20px",
        "lg": "24px",
        "xl": "40px",
      },
      borderRadius: {
        "card": "16px",
        "small": "8px",
      },
      boxShadow: {
        card: "0px 2px 8px rgba(0, 0, 0, 0.08)",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        md: "428px",
        lg: "768px",
        xl: "1024px",
      },
    },
  },
  plugins: [],
};
export default config;
