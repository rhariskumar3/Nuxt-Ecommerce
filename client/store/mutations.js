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
  }
}
