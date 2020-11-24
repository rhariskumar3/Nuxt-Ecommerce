<template>
  <section>
    <banner v-if="products.length > 0" :detail="banner" />
    <v-container v-if="products.length > 0" id="products" fluid>
      <v-row no-gutters justify="space-between">
        <v-col class="d-flex px-3" cols="12" sm="5">
          <v-range-slider
            v-model="price"
            :max="max"
            :min="min"
            hide-details
            class="align-center"
          >
            <template v-slot:prepend>
              <h4 class="align-center">Price Filter</h4>
              <v-text-field
                :value="price[0]"
                class="mt-0 pt-0"
                outlined
                dense
                disabled
                label="Min"
                type="number"
                style="width: 100px;"
                @change="$set(price, 0, $event)"
              />
            </template>
            <template v-slot:append>
              <v-text-field
                :value="price[1]"
                class="mt-0 pt-0"
                outlined
                disabled
                dense
                label="Max"
                type="number"
                style="width: 100px;"
                @change="$set(price, 1, $event)"
              />
            </template>
          </v-range-slider>
        </v-col>
        <v-col class="d-flex mt-2" cols="12" sm="3">
          <v-select v-model="filter" :items="filters" dense outlined />
        </v-col>
      </v-row>
      <v-row class="mb-6" no-gutters>
        <v-responsive min-height="50vh">
          <v-container id="categories-products" fluid>
            <v-container>
              <v-row>
                <v-col
                  v-for="(product, i) in products"
                  :key="i"
                  cols="12"
                  md="4"
                  lg="3"
                  class="d-flex"
                >
                  <product :product="product" />
                </v-col>
              </v-row>
            </v-container>
          </v-container>
        </v-responsive>
      </v-row>
      <v-row class="mb-6" no-gutters>
        <v-container id="collections-collections" fluid>
          <div class="headline text-center mb-6">
            Check out more Collections
          </div>
          <v-container>
            <v-row class="justify-center">
              <v-col
                v-for="(collection, i) in collections"
                :key="i"
                class="col-auto primary--text"
              >
                <a :href="'/collections/' + collection.friendlyUrl">
                  <v-avatar style="height: 96px; min-width: 96px; width: 96px;">
                    <v-img :src="collection.image">
                      <v-overlay
                        class="v-overlay align-center justify-center body-2"
                        style="z-index: 5;"
                        opacity="0.8"
                        absolute
                        dark
                      >
                        <div>{{ collection.title }}</div>
                      </v-overlay>
                    </v-img>
                  </v-avatar>
                </a>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-row>
    </v-container>
    <app-error v-else reason="Collection Not Found" />
  </section>
</template>

<script>
import Banner from '@/components/product/Banner'
import Product from '@/components/product/Medium'
import AppError from '@/components/base/Error'

export default {
  components: {
    Banner,
    Product,
    AppError,
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchCollectionProducts', params.category)
    await store.dispatch('fetchCollections')
  },
  data: () => ({
    price: [0, 100],
    min: 0,
    filters: ['Default', 'Price: Low to High', 'Price: High to Low'],
    filter: 'Default',
  }),
  computed: {
    products() {
      return this.$store.getters.products
    },
    collections() {
      return this.$store.getters.collections
    },
    banner() {
      const current = this.collections.find(
        (element) => element.friendlyUrl === this.$route.params.category
      )
      return {
        title: current ? current.title : 'Collections',
        image: current
          ? current.image
          : require('@/assets/banner/gardening_banner_1.jpg'),
        description: current ? current.description : '',
      }
    },
    max() {
      return parseInt(
        this.products.reduce((a, { price }) => Math.max(a, price), 0) + 10
      )
    },
  },
  watch: {
    price(val) {
      this.products = this.$store.getters.products.filter(
        (e) => e.price >= val[0] && e.price <= val[1]
      )
    },
  },
  head() {
    return {
      title: this.banner.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.banner.description,
        },
      ],
    }
  },
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  #products,
  #categories-products {
    padding: 12px 0;
  }
}
</style>
