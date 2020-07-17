export default () => ({
  // SYSTEM
  LOADING: false,
  ERR: null,

  // DICTIONARIES
  dictionaries: {},

  PAYMENT_METHODS: {
    cash: { value: 'cash', label: 'Cash', icon: 'mdi-wifi' },
    bank_card: { value: 'bank_card', label: 'Bank card', icon: 'mdi-wifi' },
  },
  SHIPPING_METHODS: {
    courier: { value: 'courier', label: 'Courier', icon: 'mdi-wifi' },
    parcel: { value: 'parcel', label: 'Parcel', icon: 'mdi-wifi' },
  },

  // PRODUCTS
  collections: {},
  products: {},
  singleProduct: {},

  // HOME
  carousels: {},
  reviews: {},
  shopData: {},
  maintananace: false,

  // ORDER
  carts: [],

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
