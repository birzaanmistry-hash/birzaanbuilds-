/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07080a",
        surface: "#0e1015",
        surface2: "#14171d",
        border: "#20242c",
        accent: "#3d7fff",
        "accent-soft": "#3d7fff1f",
        text: "#f2f4f7",
        muted: "#8b93a1",
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        serif: ["'Fraunces'", "ui-serif", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
