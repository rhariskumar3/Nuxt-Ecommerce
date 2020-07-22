export default () => ({
  // SYSTEM
  LOADING: false,
  ERR: null,

  // PRODUCTS
  collections: {},
  products: {},

  // HOME
  carousels: {},
  reviews: {},
  shopData: {},
  maintananace: false,

  // ORDER
  carts: [],
  carriers: {},
  paymentMethods: {},

  // ADMIN
  // User
  adminAuthUser: null,

  // PRODUCTS
  adminCollections: {},
  adminProducts: {},

  // ORDERS
  adminOrders: {},
  adminCustomers: {},
  adminAddresses: {},

  // HOME
  adminCarousels: {},
  adminReviews: {},

  // DATA
  adminCarriers: {},
  adminPaymentMethods: {},
  adminTax: {},

  // MAIN
  adminEmployees: {},
  adminShopData: {},
})
