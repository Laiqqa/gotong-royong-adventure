import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#006948",
          container: "#00855d",
          fixed: "#85f8c4",
          "fixed-dim": "#68dba9",
          hover: "#00563b",
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#f5fff7",
          fixed: "#002114",
          "fixed-variant": "#005137",
        },
        secondary: {
          DEFAULT: "#855300",
          container: "#fea619",
          fixed: "#ffddb8",
          "fixed-dim": "#ffb95f",
          hover: "#6b4200",
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#684000",
          fixed: "#2a1700",
          "fixed-variant": "#653e00",
        },
        tertiary: {
          DEFAULT: "#00628d",
          container: "#007cb1",
          fixed: "#c9e6ff",
          "fixed-dim": "#89ceff",
          hover: "#004e70",
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#fcfcff",
          fixed: "#001e2f",
          "fixed-variant": "#004c6e",
        },
        surface: {
          DEFAULT: "#f8f9ff",
          dim: "#ccdbf3",
          bright: "#f8f9ff",
          variant: "#d5e3fc",
          "container-lowest": "#ffffff",
          "container-low": "#eff4ff",
          container: "#e6eeff",
          "container-high": "#dce9ff",
          "container-highest": "#d5e3fc",
        },
        "on-surface": {
          DEFAULT: "#0d1c2e",
          variant: "#3d4a42",
        },
        "inverse-surface": "#233144",
        "inverse-on-surface": "#eaf1ff",
        outline: {
          DEFAULT: "#6d7a72",
          variant: "#bccac0",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },
        background: "#f8f9ff",
        "on-background": "#0d1c2e",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "Nunito", "sans-serif"],
        nunito: ["var(--font-nunito)", "Nunito", "sans-serif"],
        display: ["var(--font-fredoka)", "Fredoka", "sans-serif"],
        fredoka: ["var(--font-fredoka)", "Fredoka", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      boxShadow: {
        tactile: "0 4px 0 0 rgba(15, 23, 42, 0.08)",
        "tactile-primary": "0 5px 0 0 #004c33",
        "tactile-secondary": "0 5px 0 0 #684000",
        "tactile-tertiary": "0 5px 0 0 #004c6e",
        "tactile-error": "0 5px 0 0 #7f1d1d",
        "tactile-purple": "0 6px 0 0 #3b0764",
        "tactile-dice": "0 6px 0 0 #15803d",
      },
    },
  },
  plugins: [],
};

export default config;

