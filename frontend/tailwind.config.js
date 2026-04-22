/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a2e',      // Deep navy (luxury)
        accent: '#c9a84c',       // Gold accent
        surface: '#f5f5f0',      // Off-white
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        goldman: ['Goldman', 'sans-serif'],
        'bodoni-moda': ['Bodoni Moda', 'serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      diganta: {
        primary: '#1a1a2e',
        secondary: '#c9a84c',
        accent: '#c9a84c',
        neutral: '#f5f5f0',
        'base-100': '#ffffff',
      }
    }]
  }
}
