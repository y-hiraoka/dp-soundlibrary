import { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#0a0a0a",
      yellow: "#FBE200",
    },
    extend: {
      textColor: ({ theme }) => ({
        contrast: theme("colors.white"),
        "contrast-sub": "colors.white/70",
      }),
      minHeight: {
        screen: "100dvh",
      },
    },
  },
} satisfies Config;
