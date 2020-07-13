import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  target: 'server',

  head: {
    titleTemplate: '%s',
    title: 'NUXT Commerce',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [{ src: '@/plugins/back-to-top.js', ssr: false }],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/pwa'],

  axios: {
    baseURL:
      'http://' + process.env.API_HOST + ':' + process.env.API_PORT + '/',
  },

  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#003b63',
          accent: '#ff5722',
          secondary: '#002e4f',
          info: '#2196f3',
          warning: '#fb8c00',
          error: '#ff5252',
          success: '#4caf50',
        },
      },
    },
  },

  build: {},

  server: {
    port: 8000,
    host: '0.0.0.0',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/sessions', method: 'POST', propertyName: 'token' },
          logout: { url: '/sessions', method: 'DELETE' },
          user: { url: '/sessions/user', method: 'GET', propertyName: 'data' },
        },
      },
    },
    redirect: {
      home: false,
      callback: false,
      logout: false,
    },
  },
}
