import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ["Anta", 'system-ui'],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        input: {
          50: '#27272a',

        },
      },
      textShadow: {
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        // You can define multiple text-shadow utilities here
        // 'sm': '1px 1px 2px rgba(0, 0, 0, 0.2)',
        // 'lg': '4px 4px 6px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
