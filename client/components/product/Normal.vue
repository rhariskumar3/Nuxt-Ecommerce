<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :to="'/product/' + product.friendlyUrl"
      class="mx-4 my-1"
      style="width: 250px; white-space: normal;"
    >
      <v-img
        :src="product.media.image1"
        class="grey lighten-4"
        style="min-height: 250px; max-height: 250px;"
      />
      <div class="px-5 pb-4 pt-8" style="position: relative;">
        <v-btn
          absolute
          color="accent"
          fab
          large
          top
          right
          class="mb-6 mb-md-0 transition-swing text-none accent"
          :class="{ 'cart-transform': hover }"
          style="z-index: 1;"
        >
          <v-icon large color="darken-2">mdi-cart</v-icon>
        </v-btn>
        <div
          class="title font-weight-bold mb-3 v-sheet theme--light transparent"
          style="min-height: 64px;"
        >
          {{ product.name }}
        </div>
      </div>
      <v-card-actions class="d-flex justify-space-between align-center">
        <div class="pl-2 d-flex align-center">
          <div class="subtitle-1 font-weight-bold error--text mr-auto">
            ₹{{ product.price }}
          </div>
        </div>
        <v-btn
          v-if="product.quantity > 0"
          text
          class="mb-6 mb-md-0 text-uppercase text-none black--text"
          @click="updateCart(product, 'add')"
        >
          Add to Cart
        </v-btn>
        <span v-else>Out of Stock</span>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
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
.cart-transform {
  transform: translateY(-50%);
}
</style>
