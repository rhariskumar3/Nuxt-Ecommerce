import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  server: {
    port: 8080,
    host: 'localhost'
  },
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [{ src: '@/plugins/back-to-top.js', ssr: false }, '~/plugins/axios'],
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/dotenv'],
  axios: {},
  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#003b63',
          accent: '#ff5722',
          secondary: '#002e4f',
          info: '#2196f3',
          warning: '#fb8c00',
          error: '#ff5252',
          success: '#4caf50'
        }
      }
    }
  },
  build: {
    extend(config, ctx) {}
  }
}
