export default {
  nuxtServerInit({ dispatch }) {
    return Promise.all([dispatch('fetchShopData')])
  },
  // APP
  LOG({ commit }, payload) {
    // eslint-disable-next-line no-console
    console.log(payload)
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
    commit('setShopData', data)
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
    commit('setCarts', payload)
  },
  async fetchCarriers({ commit }) {
    const data = await getData('/carriers', this.$axios, commit)
    commit('setCarriers', data)
  },
  async fetchPaymentMethods({ commit }) {
    const data = await getData('/payment-methods', this.$axios, commit)
    commit('setPaymentMethods', data)
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
    const data = await getData('/admin/users', this.$axios, commit)
    commit(
      'setAdminCustomers',
      data.filter((list) => list.admin === false)
    )
    commit(
      'setAdminEmployees',
      data.filter((list) => list.admin === true)
    )
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
}

const getData = async function (url, axios, commit) {
  const response = await axios.get(url)
  // eslint-disable-next-line no-console
  console.log(
    response.status + ' ' + response.config.method + ' ' + response.config.url
  )
  // eslint-disable-next-line no-console
  console.log(response.data)
  return response.data
}

// const setData = async function (url, data, axios, commit) {
//
//   const response = await axios.post(url, data)
//   // eslint-disable-next-line no-console
//   console.log(
//     response.status + ' ' + response.config.method + ' ' + response.config.url
//   )
//   // eslint-disable-next-line no-console
//   console.log(response.data)
//
//   return response.data
// }
