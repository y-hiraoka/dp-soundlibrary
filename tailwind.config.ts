import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#0a0a0a",
      yellow: "#FBE200",
      red: "#F03C00",
      green: "#00C800",
      diamond: "#5A8CD2",
      pearl: "#C85A96",
    },
    fontFamily: {
      sans: [
        "var(--font-inter)",
        "'Noto Sans JP'",
        "var(--font-noto)",
        ...defaultTheme.fontFamily.sans,
      ],
    },
    extend: {
      textColor: ({ theme }) => ({
        contrast: theme("colors.white"),
        "contrast-sub": theme("colors.white/50"),
      }),
      borderColor: {
        sidenav: "#577198",
      },
      minHeight: {
        screen: "100dvh",
      },
    },
  },
} satisfies Config;
