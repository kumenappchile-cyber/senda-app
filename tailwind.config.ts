import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "16px",
        "2xl": "20px"
      }
    }
  },
  plugins: []
} satisfies Config;
