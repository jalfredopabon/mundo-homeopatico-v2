/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          vibrant: "var(--primary-vibrant)",
          DEFAULT: "var(--primary)",
          dark: "var(--primary-hover)",
        },
        secondary: "var(--secondary)",
        body: "var(--text-body)",
        muted: "var(--text-muted)",
        surface: {
          white: "var(--bg-surface)",
          muted: "var(--bg-muted)",
        },
        subtle: "var(--border-light)",
        strong: "var(--border-medium)",
      },
    },
  },
  plugins: [],
};
