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
        base100: "#2a303c",
        base200: "#242933",
        base300: "#20252e",
      },
      fontSize: {
        "6xl": "3.2rem",
      },
      height: {
        "100": "40rem",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
