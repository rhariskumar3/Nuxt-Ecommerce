export default {
  // PRODUCT
  setCollections(state, payload) {
    state.collections = payload
  },
  setProducts(state, payload) {
    state.products = payload
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
    state.maintananace = payload.maintananace ? payload.maintananace : false
  },

  // ORDER
  setCarts(state, payload) {
    let cart = state.carts
    const operation = payload.operation
    if (operation === 'clean') cart = []
    else {
      const pId = payload.product.id
      const position = cart.findIndex((ele) => ele.id === pId)
      if (position > -1) {
        cart[position].product = payload.product
        if (operation === 'add') {
          if (cart[position].product.quantity > cart[position].count)
            cart[position].count++
        } else if (operation === 'remove') {
          if (cart[position].product.minimumQuantity < cart[position].count)
            cart[position].count--
          else cart.splice(position, 1)
        } else if (operation === 'delete') cart.splice(position, 1)
      } else if (operation === 'add')
        cart.push({
          id: pId,
          product: payload.product,
          count: payload.product.minimumQuantity,
        })
    }
    state.carts = cart
  },
  setCarriers(state, payload) {
    state.carriers = payload
  },
  setPaymentMethods(state, payload) {
    state.paymentMethods = payload
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
  },
}
