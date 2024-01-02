/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fa6e72',
          300: '#ff5a5f',
          500: '#fc444a',
        },
      },
    },
  },
  plugins: [],
};
