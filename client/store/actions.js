const cookieparser = process.server ? require('cookieparser') : undefined

export default {
  nuxtServerInit({ commit, dispatch }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
    return Promise.all([dispatch('fetchShopData')])
  },
  // APP
  ERR({ commit }, payload) {
    commit('ERR', payload)
  },
  LOG({ commit }, payload) {
    // eslint-disable-next-line no-console
    console.log(payload)
    commit('ERR', payload)
    commit('LOADING', false)
  },
  // PRODUCTS
  async fetchCollections({ commit }) {
    const data = await getData('/category', this.$axios, commit)
    commit('setCollections', data)
  },
  async fetchCollectionProducts({ commit }, payload) {
    const data = await getData(
      '/product/category_url=' + payload,
      this.$axios,
      commit
    )
    commit('setProducts', data)
  },
  async loadSingleProduct({ commit }, payload) {
    const data = await getData('/product/' + payload, this.$axios, commit)
    commit('setSingleProduct', data)
  },
  // HOME
  async fetchCarousels({ commit }) {
    const data = await getData('/carousel', this.$axios, commit)
    commit('setCarousels', data)
  },
  async fetchReviews({ commit }) {
    const data = await getData('/reviews', this.$axios, commit)
    commit('setReviews', data)
  },
  async fetchShopData({ commit }) {
    const data = await getData('/shop-data', this.$axios, commit)
    commit('setShopData', data[0])
  },
  async fetchCountryData({ commit }) {
    const city = await getData('/city', this.$axios, commit)
    commit('setCities', city[0])

    const state = await getData('/state', this.$axios, commit)
    commit('setStates', state[0])

    const country = await getData('/country', this.$axios, commit)
    commit('setCountries', country[0])
  },

  // ORDER
  updateCarts: ({ commit }, payload) => {
    commit('LOADING', true)
    commit('setCarts', payload)
    commit('LOADING', false)
  },

  // ADMIN
  // PRODUCTS
  async fetchAdminCollections({ commit }) {
    const data = await getData('/admin/category', this.$axios, commit)
    commit('setAdminCollections', data)
  },
  async fetchAdminProducts({ commit }) {
    const data = await getData('/admin/products', this.$axios, commit)
    commit('setAdminProducts', data)
  },

  // ORDERS
  async fetchAdminOrders({ commit }) {
    const data = await getData('/admin/orders', this.$axios, commit)
    commit('setAdminOrders', data)
  },
  async fetchAdminCustomers({ commit }) {
    const data = await getData('/admin/customers', this.$axios, commit)
    commit('setAdminCustomers', data)
  },
  async fetchAdminAddresses({ commit }) {
    const data = await getData('/admin/customer-addresses', this.$axios, commit)
    commit('setAdminAddresses', data)
  },

  // HOME
  async fetchAdminCarousels({ commit }) {
    const data = await getData('/admin/carousel', this.$axios, commit)
    commit('setAdminCarousels', data)
  },
  async fetchAdminReviews({ commit }) {
    const data = await getData('/admin/reviews', this.$axios, commit)
    commit('setAdminReviews', data)
  },

  // DATA
  async fetchAdminCarriers({ commit }) {
    const data = await getData('/admin/carriers', this.$axios, commit)
    commit('setAdminCarriers', data)
  },
  async fetchAdminPaymentMethods({ commit }) {
    const data = await getData('/admin/payment-methods', this.$axios, commit)
    commit('setAdminPaymentMethods', data)
  },
  async fetchAdminTax({ commit }) {
    const data = await getData('/admin/tax', this.$axios, commit)
    commit('setAdminTax', data)
  },

  // MAIN
  async fetchAdminShopData({ commit }) {
    const data = await getData('/admin/shop-data', this.$axios, commit)
    commit('setAdminShopData', data)
  },
  async fetchAdminEmployees({ commit }) {
    const data = await getData('/admin/employees', this.$axios, commit)
    commit('setAdminEmployees', data)
  },
}

const getData = async function (url, axios, commit) {
  commit('LOADING', true)
  const response = await axios.get(url)
  // eslint-disable-next-line prettier/prettier
    console.log(response)
  commit('LOADING', false)
  return response.data
}
