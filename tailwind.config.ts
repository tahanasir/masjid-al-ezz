import type { Config } from "tailwindcss";

// mirror your old theme.json here:
const theme = {
  variant: "professional", // you probably won’t use this in tailwind itself
  primary: "#620043",
  appearance: "light", // handled by your darkMode setting
  radius: 0.5, // in rem
};

const radiusRem = `${theme.radius}rem`;
const borderSizes = {
  lg: radiusRem,
  md: `calc(${radiusRem} - 2px)`,
  sm: `calc(${radiusRem} - 4px)`,
};

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: borderSizes,
      colors: {
        // simple static colors
        primary: theme.primary,
        // if you need a "foreground" value, pick something legible on #620043
        "primary-foreground": "#ffffff",

        // if you also want to keep your var‑based look for other tokens,
        // just drop the `var(--…)` and hard‑code HSL here:
        background: "hsl(0, 0%, 100%)", // e.g. light mode background
        foreground: "hsl(222, 15%, 15%)", // dark-ish text
        border: "hsl(220, 10%, 90%)",
        // …etc for card, popover, secondary, accent, etc.
      },
      // your keyframes and animation blocks stay exactly the same:
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
