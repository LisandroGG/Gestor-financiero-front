/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode": "class",
  theme: {
    extend: {
      width: {
        form: '20rem',
        'form-md': '37.5rem',
        'form-lg': '43.75rem'
      }
    },
  },
  plugins: [],
}

