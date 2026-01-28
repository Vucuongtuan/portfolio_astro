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
        },
        fontFamily: {
            "mono": ["'Space Mono'", "monospace"]
        },
      },
  },
  plugins: [
    '@tailwindcss/typography'
  ],
}

