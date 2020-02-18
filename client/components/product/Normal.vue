<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      href="/product/vuetify-epic-backpack"
      class="mx-4 my-1"
      style="width: 250px; white-space: normal;"
    >
      <v-img
        src="https://cdn.shopify.com/s/files/1/2695/0984/products/Ogio_Epic_Backpack_0_5x.png?v=1567920142"
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
          Vuetify Epic Backpack
        </div>
      </div>
      <v-card-actions class="d-flex justify-space-between align-center">
        <div class="pl-2 d-flex align-center">
          <div class="subtitle-1 font-weight-bold error--text mr-auto">
            $160.00
          </div>
        </div>
        <v-btn text class="mb-6 mb-md-0 text-uppercase text-none black--text">
          Add to Cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.cart-transform {
  transform: translateY(-50%);
}
</style>
