export default {
  // SYSTEM
  IS_ADMIN: (state) => state.IS_ADMIN, // (Boolean) current user is admin?
  LOADING: (state) => state.LOADING, // (Boolean) global loading flag
  ERR: (state) => state.ERR, // (Object) global error object

  // DICTIONARIES
  dictionaries: (state) => state.dictionaries,

  // ORDERS
  PAYMENT_METHODS: (state) => state.PAYMENT_METHODS,

  // PRODUCTS
  collections: (state) => state.collections,
  products: (state) => state.products,
  singleProduct: (state) => state.singleProduct,

  // HOME
  carousels: (state) => state.carousels,
  reviews: (state) => state.reviews,
  shopData: (state) => state.shopData,

  // ORDER
  carts: (state) => state.carts
}
