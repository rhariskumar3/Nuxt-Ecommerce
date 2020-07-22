export default {
  // SYSTEM
  LOADING: (state) => state.LOADING, // (Boolean) global loading flag
  ERR: (state) => state.ERR, // (Object) global error object

  // DICTIONARIES
  dictionaries: (state) => state.dictionaries,

  // ORDERS
  PAYMENT_METHODS: (state) => state.PAYMENT_METHODS,

  // PRODUCTS
  collections: (state) => state.collections,
  products: (state) => state.products,

  // HOME
  carousels: (state) => state.carousels,
  reviews: (state) => state.reviews,
  shopData: (state) => state.shopData,

  // ORDER
  carts: (state) => state.carts,

  // ADMIN
  // PRODUCTS
  adminCollections: (state) => state.adminCollections,
  adminProducts: (state) => state.adminProducts,

  // ORDERS
  adminOrders: (state) => state.adminOrders,
  adminCustomers: (state) => state.adminCustomers,
  adminAddresses: (state) => state.adminAddresses,

  // HOME
  adminCarousels: (state) => state.adminCarousels,
  adminReviews: (state) => state.adminReviews,

  // DATA
  adminCarriers: (state) => state.adminCarriers,
  adminPaymentMethods: (state) => state.adminPaymentMethods,
  adminTax: (state) => state.adminTax,

  // MAIN
  adminShopData: (state) => state.adminShopData,
  adminEmployees: (state) => state.adminEmployees,
}
