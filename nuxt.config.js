import axios from 'axios'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ブログ',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/common.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'page',
      });
      routes.push({
        path: '/category/:categoryId/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'category',
      })
    },
  },
  generate: {
    async routes() {
      const limit = 10
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // 一覧のページング
      const pages = await axios
        .get(`https://hatopoppoblog.microcms.io/api/v1/blogs?limit=0`, {
          headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_KEY },
        })
          .then((res) =>
            range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
              route: `/page/${p}`,
            }))
          )

      const categories = await axios
        .get(`https://hatopoppoblog.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_KEY },
        })
          .then(({ data }) => {
            return data.contents.map((content) => content.id)
          });

      // カテゴリーページのページング
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios.get(
            `https://hatopoppoblog.microcms.io/api/v1/blogs?limit=0&filters=category[equals]${category}`,
            { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_KEY } }
          )
            .then((res) =>
              range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
              })))
      )
      )

      // 2次元配列になってるのでフラットにする
      const flattenCategoryPages = [].concat.apply([], categoryPages)
      return [...pages, ...flattenCategoryPages]
    },
  },
}
