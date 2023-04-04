import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      kanit: ["var(--kanit-font)"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
} satisfies Config;
