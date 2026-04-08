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
          hover: "var(--bg-surface-hover)",
        },
        subtle: "var(--border-light)",
        strong: "var(--border-medium)",
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
};
