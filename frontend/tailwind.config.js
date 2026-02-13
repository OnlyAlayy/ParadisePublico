/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        watercolor: {
          blue: '#6EC1E4',
          purple: '#9B7EDE',
          pink: '#F3A1C4',
          yellow: '#F6D365',
        },
      },
    },
  },
  plugins: [],
}
