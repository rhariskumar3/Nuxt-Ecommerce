<template>
  <v-responsive style="min-height: 100vh;">
    <v-row>
      <app-carousel />
      <app-highlights />
      <app-featured-products :products="featured" />
      <app-new-products :products="newProducts" />
      <app-reviews />
      <app-newsletter />
    </v-row>
  </v-responsive>
</template>

<script>
import AppCarousel from '@/components/home/Carousel'
import AppHighlights from '@/components/home/Highlights'
import AppFeaturedProducts from '@/components/home/FeaturedProducts'
import AppNewProducts from '@/components/home/NewProducts'
import AppReviews from '@/components/home/Reviews'
import AppNewsletter from '@/components/home/Newsletter'
export default {
  components: {
    AppCarousel,
    AppHighlights,
    AppFeaturedProducts,
    AppNewProducts,
    AppReviews,
    AppNewsletter,
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchCarousels')
    await store.dispatch('fetchReviews')
  },
  asyncData({ app: { $axios, $auth }, params, error }) {
    return $axios.get('/product/featured').then((res) => {
      return { featured: res.data, newProducts: res.data }
    })
  },
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'E-commerce',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.cart-transform {
  transform: translateY(-50%);
}
</style>
