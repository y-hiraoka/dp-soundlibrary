import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#0a0a0a",
      yellow: "#FBE200",
    },
    fontFamily: {
      sans: ["'Noto Sans JP'", "var(--font-noto)", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      textColor: ({ theme }) => ({
        contrast: theme("colors.white"),
        "contrast-sub": theme("colors.white/50"),
      }),
      minHeight: {
        screen: "100dvh",
      },
    },
  },
} satisfies Config;
