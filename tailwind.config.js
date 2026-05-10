/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"New York"', 'Georgia', 'serif'],
        sans: ['"SF Pro Display"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 1px 2px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
