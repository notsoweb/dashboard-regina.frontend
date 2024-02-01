/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'google-icon':['Material Icons'],
        'google-icon-outlined':['Material Symbols Outlined']
      }
    }
  },
  plugins: [],
}

