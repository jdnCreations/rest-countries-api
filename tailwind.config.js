/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      // dm elements
      "dark-blue": "hsl(209, 23%, 22%)",
      // dm background
      "very-dark-blue": "hsl(207, 26%, 17%)",
      // lm text
      "very-dark-blue-text": "hsl(200, 15%, 8%)",
      // lm input
      "dark-gray": "hsl(0, 0%, 52%)",
      // lm bg
      "very-light-gray": "hsl(0, 0%, 98%)",
      // dm text & lm elements
      "white": "hsl(0, 0%, 100%)",
    } 
  },
  plugins: [],
}

