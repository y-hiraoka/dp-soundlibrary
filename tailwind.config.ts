import { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      minHeight: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
} satisfies Config;
