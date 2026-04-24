import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  dir: {
    pages: 'templates/pages',
  },
  css: [
    '@/assets/scss/style.scss',
  ],
  runtimeConfig: {
    public: {
      wpApiBase: process.env.NUXT_PUBLIC_WP_API_BASE || 'https://example.com/wp-json',
      wpCf7FormId: process.env.NUXT_PUBLIC_WP_CF7_FORM_ID || '',
    },
  },
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'portfolio-archive',
        path: '/portfolio',
        file: resolve(__dirname, 'src/templates/archive/Portfolio.vue'),
      })
      pages.push({
        name: 'portfolio-single',
        path: '/portfolio/:slug',
        file: resolve(__dirname, 'src/templates/single/Portfolio.vue'),
      })
    },
  },
})
