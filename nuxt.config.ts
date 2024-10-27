// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: 'ikakprosto.ru'
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-svgo'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
