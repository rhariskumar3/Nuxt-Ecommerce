export default {
  // USER
  setAdmin(state, payload) {
    state.IS_ADMIN = payload
  },

  // SYSTEM
  LOADING(state, payload) {
    state.LOADING = payload
  },
  ERR(state, payload) {
    state.ERR = payload
  },

  // DICTIONARIES
  setDictionary(state, payload) {
    state.dictionaries[payload.name] = payload.data
  },

  // PRODUCT
  setCollections(state, payload) {
    state.collections = payload
  },
  setProducts(state, payload) {
    state.products = payload
  },
  setSingleProduct(state, payload) {
    state.singleProduct = payload
  },

  // HOME
  setCarousels(state, payload) {
    state.carousels = payload
  },
  setReviews(state, payload) {
    state.reviews = payload
  },
  setShopData(state, payload) {
    state.shopData = payload
  },

  // ORDER
  setCarts(state, payload) {
    const cart = state.carts
    const operation = payload.operation
    const pId = payload.product.id
    const position = cart.findIndex((ele) => ele.id === pId)
    if (position > -1) {
      if (operation === 'add')
        cart[position] = { id: pId, product: payload.product }
      else if (operation === 'remove') cart.splice(position, 1)
    } else if (operation === 'add')
      cart.push({ id: pId, product: payload.product })
    state.carts = cart
  },

  // ADMIN
  // USER
  SET_ADMIN_USER(state, user) {
    state.adminAuthUser = user
  },

  // PRODUCT
  setAdminCollections(state, payload) {
    state.adminCollections = payload
  },
  setAdminProducts(state, payload) {
    state.adminProducts = payload
  },

  // ORDERS
  setAdminOrders(state, payload) {
    state.adminOrders = payload
  },
  setAdminCustomers(state, payload) {
    state.adminCustomers = payload
  },
  setAdminAddresses(state, payload) {
    state.adminAddresses = payload
  },

  // HOME
  setAdminCarousels(state, payload) {
    state.adminCarousels = payload
  },
  setAdminReviews(state, payload) {
    state.adminReviews = payload
  },

  // DATA
  setAdminCarriers(state, payload) {
    state.adminCarriers = payload
  },
  setAdminPaymentMethods(state, payload) {
    state.adminPaymentMethods = payload
  },
  setAdminTax(state, payload) {
    state.adminTax = payload
  },

  // MAIN
  setAdminShopData(state, payload) {
    state.adminShopData = payload
  },
  setAdminEmployees(state, payload) {
    state.adminEmployees = payload
  }
}
