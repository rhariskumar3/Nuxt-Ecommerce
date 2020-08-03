<template>
  <v-col cols="12">
    <div>
      <v-container id="featured-products" class="products px-0">
        <div class="text-center">
          <h2
            class="font-weight-bold mb-6"
            :class="{
              'displat-2': $vuetify.breakpoint.smAndDown,
              'displat-1': $vuetify.breakpoint.mdAndUp,
            }"
          >
            New Products
          </h2>
        </div>
        <v-row>
          <v-col cols="12">
            <div class="py-6 hidden-sm-and-down"></div>
            <v-slide-group
              center-active
              class="pa-0 v-slide-group--has-affixes v-slide-group--is-overflowing"
            >
              <v-slide-item v-for="item in products" :key="item.id">
                <product :product="item" />
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-col>
</template>

<script>
import Product from '~/components/product/Normal'
export default {
  components: {
    Product,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
}
</script>
