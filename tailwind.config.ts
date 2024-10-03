import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        fontSize: {
          'ds': '1.5rem', // Custom font size
        },
      colors: {
        lightdk: '#a89793',
        background: '#fcf8f5',
        dk: "#230a06",
        rd: "#ca3c18",
        lrd: "#fcf8f5",
      },
    },
  },
  plugins: [],
};
export default config;
