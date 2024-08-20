/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        up: 'rgb(0 169 110)',
        down: 'rgb(255 88 97)',
        hold: 'rgb(255 190 0)'
      }
    },
  },
  plugins: [daisyui,],
  daisyui: {
    themes: ["dark"],
  },
}

