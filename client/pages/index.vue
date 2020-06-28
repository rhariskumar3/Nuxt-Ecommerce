<template>
  <v-responsive style="min-height: 100vh;">
    <v-row>
      <app-carousel />
      <app-highlights />
      <app-featured-products />
      <app-reviews />
      <app-newsletter />
    </v-row>
  </v-responsive>
</template>

<script>
import AppCarousel from '@/components/home/Carousel'
import AppHighlights from '@/components/home/Highlights'
import AppFeaturedProducts from '@/components/home/FeaturedProducts'
import AppReviews from '@/components/home/Reviews'
import AppNewsletter from '@/components/home/Newsletter'
export default {
  components: {
    AppCarousel,
    AppHighlights,
    AppFeaturedProducts,
    AppReviews,
    AppNewsletter,
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchCarousels')
    await store.dispatch('fetchReviews')
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
