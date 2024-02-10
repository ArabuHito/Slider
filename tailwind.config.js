const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'text': '#617375',
        'background': '#fcf6e8',
        'primary': '#d0ae95',
        'secondary': '#b1a49a',
        'accent': '#65584e',
        'code': '#24273a',
        'border': '#575d80'
      }
    },
  },
  plugins: []
}

