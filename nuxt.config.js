import pkg from './package'
import Configure from './constants/Configure'

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    'assets/style/app.styl',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/axios',
    { src: '@/plugins/google-analytics', ssr: false },
    { src: '@/plugins/localStorage', ssr: false },
    { src: '@/plugins/vee-validate', ssr: false },
    '@/plugins/vue-events',
    '@/plugins/vuetify',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: Configure.servers.API,
    https: true,
    proxy: true,
    progress: true,
    retry: false,
    credentials: false,
    debug: false,
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:4500/',
      secure: false,
      pathRewrite: {
        '^/api/': '',
      },
    },
    '/mock/': {
      target: 'http://localhost:8080/',
      secure: false,
      pathRewrite: {
        '^/mock/': '',
      },
    },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      // IDE에서 import 경로를 제대로 못찾는 이슈로 추가함 ("~/"로 경로 잡을 필요 없음)
      config.resolve.modules.unshift(config.resolve.alias['~'])
    },
  },
}
