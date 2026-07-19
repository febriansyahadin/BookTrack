/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#EFEAE0",
          card: "#FBF9F4",
        },
        ink: {
          DEFAULT: "#1E2A38",
          soft: "#3A4756",
        },
        gold: {
          DEFAULT: "#C98A2C",
          light: "#D9A441",
        },
        library: {
          green: "#2F5D50",
        },
        night: {
          bg: "#14181F",
          surface: "#1E2430",
          text: "#E8E3D8",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(30,42,56,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
