/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8f0',
          100: '#f9edd8',
          200: '#f2d9a8',
          300: '#e9c06e',
          400: '#dfa43a',
          500: '#c8891e',
          600: '#a86c16',
          700: '#865216',
          800: '#6d4118',
          900: '#5a3618',
        },
        charcoal: {
          900: '#1a1714',
          800: '#242019',
          700: '#2e291f',
          600: '#3d3528',
        },
        cream: {
          50: '#fdfcf9',
          100: '#f8f4ec',
          200: '#f0e8d5',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      }
    },
  },
  plugins: [],
}
