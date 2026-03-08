/** @type {import('tailwindcss').Config} */
export default {
 content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
  extend: {
   fontFamily: {
    playfair: ['"Playfair Display"', 'serif'],
    cormorant: ['"Cormorant Garamond"', 'serif'],
    outfit: ['Outfit', 'sans-serif'],
   },
   colors: {
    leaf: {
     50: '#f0fdf0',
     100: '#dcfce7',
     200: '#bbf7d0',
     300: '#86efac',
     400: '#4ade80',
     500: '#22c55e',
     600: '#16a34a',
     700: '#15803d',
     800: '#166534',
     900: '#14532d',
    },
   },
   backgroundImage: {
    'leaf-gradient': 'linear-gradient(135deg, #a8e063 0%, #56ab2f 50%, #2d6a0a 100%)',
   },
  },
 },
 plugins: [],
}
