import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primaryDark:'var(--primaryDark)',
        secondaryDark:'var(--secondaryDark)',
        primaryDarkBoxShadow:'var(--primaryDarkBoxShadow)'
      },
      boxShadow:{
        'primaryDarkBoxShadow': '0 4px 6px rgba(58, 58, 238, 0.397)',
        'primaryLightBoxShadow': '0 4px 6px rgba(187, 195, 251, 0.3)'
      }
    },
  },
  plugins: [],
};
export default config;
