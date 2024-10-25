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
    extend: {
      colors: {
        'accent-primary': '#FF6B00',
        'accent-secondary': 'rgba(255, 107, 0, 0.30)',
        'primary-back': '#05090E',
        'secondary-black': '#040405',
        'primary-gray': '#F4F4F5',
        'gray-border': 'rgba(4, 4, 5, 0.22)',
      },
    },
  },
  plugins: [],
};
