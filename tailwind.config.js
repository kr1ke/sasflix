/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    fontFamily: {
      SFProText: ['SF Pro Text', 'Arial', 'sans-serif'], // до загрузки - Arial, после - SFProText
      SFProDisplay: ['SF Pro Display', 'Arial', 'sans-serif'], // до загрузки - Arial, после - SFProDisplay
    },
    extend: {
      colors: {
        'accent-primary': '#FF6B00',
        'accent-secondary': 'rgba(255, 107, 0, 0.30)',
        'primary-black': '#05090E',
        'secondary-black': '#040405',
        'primary-gray': 'rgba(4, 4, 5, 0.04)',
        'gray-border': 'rgba(4, 4, 5, 0.22)',
        'primary-red': '#FF3B30',
        'secondary-red': '#EB5757',
        'primary-white': 'rgba(255, 255, 255, 0.95)',
      },
    },
  },
  plugins: [],
};
