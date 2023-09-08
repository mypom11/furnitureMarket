import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["var(--notoSans)", ...fontFamily.sans],
      roboto: ["var(--roboto)", ...fontFamily.sans],
      rouge: ["var(--rouge-script)"],
    },
    colors: {
      dark: "#1b1b1b",
      light: "#f5f5f5",
      primary: "#3B82F6",
      primaryDark: "#8B5CF6",
      ...colors,
    },
    extend: {},
  },

  plugins: [],
};
export default config;
