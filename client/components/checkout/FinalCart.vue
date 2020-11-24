<template>
  <v-card flat>
    <v-list tile light two-line>
      <v-list-item v-for="(cart, i) in carts" :key="i">
        <v-list-item-avatar
          tile
          class="grey lighten-3 hidden-xs-only"
          style="height: 60px; min-width: 60px; width: 60px;"
        >
          <v-img :src="cart.product.media.image1 || ''" />
        </v-list-item-avatar>
        <v-responsive class="grow" style="min-width: 150px; max-width: 50%;">
          <v-list-item-title>
            <Nuxt-link
              :to="'/product/' + cart.product.friendlyUrl"
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
          style="max-width: 164px;"
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
            readonly
            value="1"
            prepend-icon="mdi-minus"
            append-outer-icon="mdi-plus"
            :min="cart.product.minimumQuantity"
            :max="cart.product.quantity"
            solo-inverted
            @click:append-outer="updateCart(cart.product, 'add')"
            @click:prepend="updateCart(cart.product, 'remove')"
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
      <v-col cols="12" class="pb-0 text-right">
        <v-responsive
          class="ml-auto overflow-visible"
          style="max-width: 230px;"
        >
          <v-text-field
            dense
            light
            single-line
            solo
            solo-inverted
            flat
            disabled
            is-booted
            enclosed
            label="Discount Code"
          />
        </v-responsive>
      </v-col>
      <v-col cols="12" class="text-right pt-0 d-flex align-center justify-end">
        <v-col cols="6"
          ><span class="body-2 font-weight-light grey--text">
            Subtotal:
          </span></v-col
        >
        <v-col cols="6"
          ><v-responsive
            class="text--darken-1 font-weight-medium shrink d-inline-flex justify-end"
            style="min-width: 100px;"
          >
            ₹{{ subTotal }}</v-responsive
          ></v-col
        >
      </v-col>
      <v-col cols="12" class="text-right pt-0 d-flex align-center justify-end">
        <v-col cols="6"
          ><span class="body-2 font-weight-light grey--text">
            Tax:
          </span></v-col
        >
        <v-col cols="6"
          ><v-responsive
            class="text--darken-1 font-weight-medium shrink d-inline-flex justify-end"
            style="min-width: 100px;"
          >
            ₹{{ tax }}</v-responsive
          ></v-col
        >
      </v-col>
      <v-col cols="12" class="text-right pt-0 d-flex align-center justify-end">
        <v-col cols="6"
          ><span class="body-2 font-weight-light grey--text">
            Shipping:
          </span></v-col
        >
        <v-col cols="6"
          ><v-responsive
            class="text--darken-1 font-weight-medium shrink d-inline-flex justify-end"
            style="min-width: 100px;"
          >
            ₹{{ shipping }}</v-responsive
          ></v-col
        >
      </v-col>
    </v-row>
    <v-divider />
    <v-row class="px-3 pt-2 align-center">
      <v-col cols="12" class="text-right pt-0 d-flex align-center justify-end">
        <v-col cols="6">
          <span class="body-2 font-weight-light grey--text">
            Total:
          </span></v-col
        >
        <v-col cols="6">
          <v-responsive
            class="green--text headline text--darken-1 font-weight-medium shrink d-inline-flex justify-end"
            style="min-width: 100px;"
          >
            ₹{{ grantTotal }}</v-responsive
          ></v-col
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    carts: {
      type: Array,
      required: true,
    },
  },
  computed: {
    subTotal() {
      return Object.keys(this.carts).reduce(
        (sum, key) =>
          sum +
          parseFloat(
            (this.carts[key].product.price * this.carts[key].count).toFixed(2)
          ),
        0
      )
    },
    tax() {
      return Object.keys(this.carts).reduce(
        (sum, key) =>
          sum +
          parseFloat(
            (
              (this.carts[key].product.tax.rate / 100) *
              this.carts[key].product.price *
              this.carts[key].count
            ).toFixed(2)
          ),
        0
      )
    },
    shipping() {
      return Object.keys(this.carts).reduce(
        (sum, key) =>
          sum +
          parseFloat(
            (
              this.carts[key].product.shippingFee * this.carts[key].count
            ).toFixed(2)
          ),
        0
      )
    },
    grantTotal() {
      return this.subTotal + this.tax + this.shipping
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
