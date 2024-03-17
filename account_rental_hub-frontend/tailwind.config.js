/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey-1': '#f5f6fa',
        'regal-blue': '#4880FF',
        'regal-grey': '#D5D5D5'
      },
    },
  },
  plugins: [],
}