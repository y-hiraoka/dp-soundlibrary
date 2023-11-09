import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#0a0a0a",
      yellow: "#FBE200",
      pokemon: {
        red: "#F03C00",
        green: "#00C800",
        diamond: "#5A8CD2",
        pearl: "#C85A96",
      },
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
      height: {
        "audio-controller": "90px",
      },
      minHeight: {
        screen: "100dvh",
      },
      maxHeight: {
        screen: "100dvh",
        navigation:
          "calc(theme(maxHeight.screen) - theme(height.audio-controller) - theme(spacing.4) * 3)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addBase }) => {
      addBase({
        "@keyframes background-gradient-pulse": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      });

      addUtilities({
        ".background-gradient-pokemon-red": {
          background:
            "radial-gradient(circle at 75% 25%, theme(colors.pokemon.red/35%), transparent 80%)",
          animation: "background-gradient-pulse 10s ease-in infinite alternate",
        },
        ".background-gradient-pokemon-green": {
          background:
            "radial-gradient(circle at 25% 75%, theme(colors.pokemon.green/28%), transparent 80%)",
          animation: "background-gradient-pulse 10s ease-in infinite alternate-reverse",
        },
        ".background-gradient-pokemon-diamond": {
          background:
            "radial-gradient(circle at 75% 25%, theme(colors.pokemon.diamond/40%), transparent)",
          animation: "background-gradient-pulse 10s ease-in infinite alternate",
        },
        ".background-gradient-pokemon-pearl": {
          background:
            "radial-gradient(circle at 25% 75%, theme(colors.pokemon.pearl/35%), transparent)",
          animation: "background-gradient-pulse 10s ease-in infinite alternate-reverse",
        },
      });
    }),
  ],
} satisfies Config;
