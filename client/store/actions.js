export default {
  nuxtServerInit({ dispatch }, { req }) {
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
  async fetchCollections({ commit, getters, dispatch }) {
    commit('LOADING', true)
    await this.$api
      .$get('/category')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setCollections', response)
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
  },
  async fetchCollectionProducts({ commit, getters, dispatch }, payload) {
    commit('LOADING', true)
    await this.$api
      .$get('/product/category_url=' + payload)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setProducts', response)
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
  },
  async loadSingleProduct({ commit, getters, dispatch }, payload) {
    commit('LOADING', true)
    await this.$api
      .$get('/product/' + payload)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setSingleProduct', response)
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
  },
  // HOME
  async fetchCarousels({ commit, getters, dispatch }) {
    commit('LOADING', true)
    await this.$api
      .$get('/carousel')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setCarousels', response)
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
  },
  async fetchReviews({ commit, getters, dispatch }) {
    commit('LOADING', true)
    await this.$api
      .$get('/reviews')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setReviews', response)
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
  },
  async fetchShopData({ commit, getters, dispatch }) {
    commit('LOADING', true)
    await this.$api
      .$get('/shop-data')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setShopData', response[0])
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
  },
  async fetchCountryData({ commit, getters, dispatch }) {
    commit('LOADING', true)
    await this.$api
      .$get('/city')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setCities', response[0])
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
    await this.$api
      .$get('/state')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setStates', response[0])
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
    await this.$api
      .$get('/country')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('=====>', response)
        commit('setCountries', response[0])
        commit('LOADING', false)
      })
      .catch((err) => dispatch('LOG', err))
  },

  // ORDER
  updateCarts: ({ commit, getters, dispatch }, payload) => {
    commit('LOADING', true)
    commit('setCarts', payload)
    commit('LOADING', false)
  }
}
