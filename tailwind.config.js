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
        up: '#26A69A',
        down: '#EF5350'
      }
    },
  },
  plugins: [daisyui,],
  daisyui: {
    themes: ["dark"],
  },
}

