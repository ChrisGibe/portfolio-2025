// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/style.css'],
  modules: ['@nuxt/fonts'],
  fonts: {
    families: [ 
      { name: 'Space Mono', provider: 'google', weights: [400, 700] }
    ]
  }
})