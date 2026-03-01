/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,astro}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,astro}",
    "./src/pages/**/*.{js,ts,jsx,tsx,astro}",
    "./src/**/*.{js,ts,jsx,tsx,astro}",
  ],
  theme: {
     extend: {
        colors: {
            "bg-pure": "#ffffff",
            "text-stark": "#000000",
            "accent-subtle": "#e5e7eb", // light gray for separators
             // Stitch colors
            "stitch-bg-dark": "#0a0a0a",
            "stitch-border-light": "#e5e5e5",
            "stitch-border-dark": "#262626",
        },
        fontFamily: {
            "mono": ["'Space Mono'", "monospace"],
            "display": ["'Bodoni Moda'", "serif"],
            "sans": ["'Inter'", "sans-serif"],
        },
      },
  },
  plugins: [
    '@tailwindcss/typography'
  ],
}

