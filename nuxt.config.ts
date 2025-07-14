// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/style.scss'],
  modules: ['@nuxt/fonts'],
  fonts: {
    families: [ 
      { name: 'Space Mono Regular', src: '/fonts/SpaceMono-Regular.woff2', weights: [ 400 ] },
      { name: 'Space Mono Bold', src: '/fonts/SpaceMono-Bold.woff2', weights: [ 700 ] }
    ]
  }
})