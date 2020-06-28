<template>
  <v-card flat>
    <v-list tile light two-line>
      <v-list-item v-for="(cart, i) in carts" :key="i">
        <v-list-item-avatar
          tile
          class="grey lighten-3 hidden-xs-only"
          style="height: 60px; min-width: 60px; width: 60px;"
        >
          <v-img :src="cart.product.image_1" />
        </v-list-item-avatar>
        <v-responsive class="grow" style="min-width: 150px; max-width: 50%;">
          <v-list-item-title>
            <Nuxt-link
              :to="'/product/' + cart.product.friendly_url"
              class="font-weight-medium text--primary text-decoration-none"
              >{{ cart.product.name }}</Nuxt-link
            >
          </v-list-item-title>
          <v-list-item-subtitle class="grey--text text--darken-2 body-2"
            >₹{{ cart.product.price }}</v-list-item-subtitle
          >
        </v-responsive>
        <v-responsive
          class="ml-auto"
          tag="v-list-item-action"
          style="max-width: 64px;"
        >
          <v-text-field
            v-model="cart.count"
            hide-details
            dense
            single-line
            solo
            flat
            is-booted
            enclosed
            light
            type="number"
            disabled
            :min="cart.product.minimum_quantity"
            :max="cart.product.quantity"
            solo-inverted
          />
        </v-responsive>
        <v-list-item-action>
          <v-icon
            class="notranslate"
            style="font-size: 16px; height: 16px; width: 16px;"
            type="button"
            aria-label="Remove Item from Cart"
            @click="updateCart(cart.product, 'delete')"
            >mdi-close-circle-outline</v-icon
          >
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-row class="px-3 pt-2 align-center">
      <!--      <v-col cols="12" class="pb-0 text-right">-->
      <!--        <v-responsive-->
      <!--          class="ml-auto overflow-visible"-->
      <!--          style="max-width: 230px;"-->
      <!--        >-->
      <!--          <v-text-field-->
      <!--            dense-->
      <!--            light-->
      <!--            single-line-->
      <!--            solo-->
      <!--            solo-inverted-->
      <!--            flat-->
      <!--            is-booted-->
      <!--            enclosed-->
      <!--            label="Discount Code"-->
      <!--          />-->
      <!--        </v-responsive>-->
      <!--      </v-col>-->
      <v-col cols="12" class="text-right pt-0 d-flex align-center justify-end">
        <span class="body-2 font-weight-light grey--text"> Subtotal: </span>
        <v-responsive
          class="green--text headline text--darken-1 font-weight-medium shrink d-inline-flex justify-end"
          style="min-width: 100px;"
        >
          ₹{{ totalCartValue }}</v-responsive
        >
      </v-col>
      <v-col cols="12">
        <v-btn to="/checkout" block light large class="primary">
          Checkout
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ['carts'],
  computed: {
    totalCartValue() {
      return Object.keys(this.carts).reduce(
        (sum, key) =>
          sum +
          parseFloat(this.carts[key].product.price * this.carts[key].count),
        0
      )
    },
  },
  methods: {
    updateCart(product1, operation1) {
      this.$store.dispatch('updateCarts', {
        operation: operation1,
        product: product1,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-application .text--primary {
  color: rgba(0, 0, 0, 0.87) !important;
}
.text-decoration-none {
  text-decoration: none;
}
</style>
