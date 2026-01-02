import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F07E1A",
        secondary: "#1A5FF0",
        success: "#28A745",
        warning: "#FFC107",
        danger: "#DC3545",
        "text-dark": "#212529",
        "text-gray": "#6C757D",
        "bg-light": "#F8F9FA",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        xs: ["13px", { lineHeight: "18px" }],
        sm: ["15px", { lineHeight: "22px" }],
        base: ["17px", { lineHeight: "26px" }],
        lg: ["19px", { lineHeight: "30px" }],
        xl: ["21px", { lineHeight: "32px" }],
        "2xl": ["26px", { lineHeight: "36px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
        "4xl": ["40px", { lineHeight: "48px" }],
      },
    },
  },
  plugins: [],
};
export default config;
