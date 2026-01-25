/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [
    require('daisyui'),
  ],
}
