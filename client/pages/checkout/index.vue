<template>
  <v-container id="checkout" fluid>
    <v-responsive min-height="50vh">
      <v-container
        v-if="carts.length > 0"
        id="checkout-detail"
        fluid
        class="pt-0"
      >
        <v-container>
          <v-row>
            <v-col cols="12" md="7">
              <cart-form :addresses="addresses" :carts="carts" />
            </v-col>
            <v-col cols="12" md="5">
              <v-container class="pa-0">
                <cart-final :carts="carts" />
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <app-error v-else reason="Nothing in Cart" />
    </v-responsive>
  </v-container>
</template>

<script>
import CartForm from '~/components/checkout/Form'
import CartFinal from '~/components/checkout/FinalCart'
import AppError from '~/components/base/Error'

export default {
  layout: 'error',
  components: {
    CartForm,
    CartFinal,
    AppError,
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchCarriers')
    await store.dispatch('fetchPaymentMethods')
  },
  asyncData({ app: { $axios, $auth }, params, error }) {
    return $axios
      .get(`/address/` + $auth.user.id)
      .then((res) => {
        return { addresses: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Addresses not found' })
      })
  },
  computed: {
    carts() {
      return this.$store.getters.carts
    },
  },
  head() {
    return {
      title: 'Checkout',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My Cart',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
