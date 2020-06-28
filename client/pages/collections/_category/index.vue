<template>
  <section>
    <banner v-if="products.length > 0" :detail="banner" />
    <v-container v-if="products.length > 0" id="products" fluid>
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
      <v-container id="collections-collections" fluid>
        <div class="headline text-center mb-6">Check out more Collections</div>
        <v-container>
          <v-row class="justify-center">
            <v-col
              v-for="(collection, i) in collections"
              :key="i"
              class="col-auto primary--text"
            >
              <a :href="'/collections/' + collection.friendly_url">
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
    </v-container>
    <app-error v-else reason="Collection Not Found" />
  </section>
</template>

<script>
import Banner from '~/components/product/Banner'
import Product from '~/components/product/Medium'
import AppError from '~/components/base/Error'

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
  computed: {
    products() {
      return this.$store.getters.products
    },
    collections() {
      return this.$store.getters.collections
    },
    banner() {
      const current = this.collections.find(
        // eslint-disable-next-line eqeqeq,no-undef
        (element) => element.friendly_url === this.$route.params.category
      )
      return {
        title: current.title,
        image: current.image,
        description: current.description,
      }
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
