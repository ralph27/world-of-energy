import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      kanit: ["var(--kanit-font)"],
      roboto: ["var(--roboto-font)"],
    },

    extend: {
      colors: {
        base200: "#242933",
        base100: "#2a303c",
      },
      fontSize: {
        "6xl": "3.2rem",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
