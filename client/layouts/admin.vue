<template>
  <v-app>
    <no-ssr> <app-header :links="links" /> </no-ssr>
    <v-main>
      <nuxt />
    </v-main>
    <no-ssr>
      <back-to-top id="back_to_bottom" visible-offset="500">
        <v-btn id="back_to_top" color="accent" class="ma-2 white--text">
          <v-icon>mdi-chevron-double-up</v-icon>
        </v-btn>
      </back-to-top>
    </no-ssr>
  </v-app>
</template>

<script>
import AppHeader from '~/components/base/AdminHeader'

export default {
  middleware: ['auth-admin'],
  components: { AppHeader },
  data: () => ({
    links: [
      {
        icon: 'mdi-view-dashboard',
        title: 'Dashboard',
        to: '/admin',
      },
      {
        icon: 'mdi-bowl',
        title: 'Products',
        to: '/admin/products',
      },
      {
        icon: 'mdi-lamp',
        title: 'Categories',
        to: '/admin/categories',
      },
      {
        icon: 'mdi-react',
        title: 'Orders',
        to: '/admin/orders',
      },
      {
        icon: 'mdi-human-male-female',
        title: 'Customers',
        to: '/admin/customers',
      },
      {
        icon: 'mdi-directions',
        title: 'Customer Address',
        to: '/admin/customer-address',
      },
      {
        icon: 'mdi-coffee',
        title: 'Carousels',
        to: '/admin/carousels',
      },
      {
        icon: 'mdi-comment-text',
        title: 'Reviews',
        to: '/admin/reviews',
      },
      {
        icon: 'mdi-donkey',
        title: 'Tax',
        to: '/admin/tax',
      },
      {
        icon: 'mdi-car-pickup',
        title: 'Carriers',
        to: '/admin/carriers',
      },
      {
        icon: 'mdi-credit-card-multiple',
        title: 'Payment Methods',
        to: '/admin/payment-methods',
      },
      {
        icon: 'mdi-houzz-box',
        title: 'Shop Data',
        to: '/admin/shop-data',
      },
      {
        icon: 'mdi-linux',
        title: 'Employees',
        to: '/admin/employees',
      },
    ],
  }),
}
</script>

<style lang="scss">
@media (min-width: 1264px) {
  .container {
    max-width: 1480px;
  }
}

@media (min-width: 960px) {
  .container {
    max-width: 1480px;
  }
}
</style>
