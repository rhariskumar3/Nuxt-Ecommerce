<template>
  <v-container id="product" fluid>
    <v-responsive min-height="50vh">
      <v-container id="product-detail" fluid class="pt-0">
        <v-container>
          <v-row v-if="product">
            <v-col cols="12" md="6">
              <v-row class="ma-n3 justify-center">
                <v-col
                  cols="12"
                  md="auto"
                  class="d-flex d-md-block justify-space-between"
                >
                  <v-responsive min-width="48px">
                    <v-card
                      v-for="image in images"
                      :key="image.position"
                      flat
                      class="v-avatar d-md-block mb-md-6 grey lighten-2"
                      @click="loadMainImage(image)"
                    >
                      <v-img
                        style="height: 48px; max-width: 48px;"
                        :src="image"
                      />
                    </v-card>
                  </v-responsive>
                </v-col>
                <v-col cols="12" md="9">
                  <v-card class="pa-4 mx-auto grey lighten-3" flat>
                    <v-img
                      style="
                        height: 500px;
                        max-width: 100%;
                        transform-origin: center top 0px;
                      "
                      :src="mainImage"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-container class="pa-0">
                <v-row>
                  <v-col cols="12">
                    <Nuxt-link to="/" class="text--primary body-2 mb-3 d-block">
                      Back to Shop
                    </Nuxt-link>
                    <h1 class="font-weight-bold mb-6 display-2">
                      {{ product.name }}
                    </h1>
                    <div class="mb-6">
                      <span class="font-weight-medium display-1 accent--text"
                        >₹{{ product.price }}</span
                      >
                    </div>
                    <div>
                      <div v-if="product.quantity > 0">
                        <strong>Availability</strong> : In Stock [{{
                          product.quantity
                        }}]
                      </div>
                      <div v-else>
                        <strong>Availability</strong> : Out of Stock
                      </div>
                      <div>
                        <strong>Product Code</strong> : BEP{{ product.id }}
                      </div>
                      <div v-if="product.minimum_quantity > 1">
                        <strong>Minimum Order Quantity</strong> :
                        {{ product.minimum_quantity }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="auto">
                    <v-btn
                      class="mb-6 mb-md-0 v-size--x-large text-none accent"
                      style="min-width: 160px;"
                      block
                      :disabled="product.quantity < 1"
                      @click="updateCart($store.getters.singleProduct, 'add')"
                    >
                      Add To Cart
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="auto">
                    <v-btn
                      class="v-size--x-large text-none white"
                      style="min-width: 160px;"
                      block
                      :disabled="product.quantity < 1"
                      @click="checkout($store.getters.singleProduct)"
                    >
                      Buy It Now
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <div
                      class="d-inline-flex align-center justify-space-between"
                    >
                      <span>Find us on social media</span>
                      <div class="ma-3">
                        <v-btn
                          v-for="i in 3"
                          :key="i"
                          :href="
                            'http://twitter.com/share?text=' +
                            product.name +
                            '&url=' +
                            $route.fullPath +
                            '&hashtags=hashtag'
                          "
                          target="_blank"
                          class="mx-1 primary"
                          aria-label="Link to Twitter"
                          fab
                          small
                        >
                          <v-icon
                            class="notranslate"
                            style="font-size: 20px; height: 20px; width: 20px;"
                            >mdi-twitter
                          </v-icon>
                        </v-btn>
                      </div>
                    </div>
                    <div class="py-4">
                      <p>{{ product.summary }}f</p>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="12" md="12" class="mt-3">
              <v-row class="mt-5 ma-n3">
                <v-col cols="12">
                  <h2>Description :</h2>
                </v-col>
                <v-col cols="12">
                  {{ product.description }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <app-error v-else reason="Product Not Found" />
        </v-container>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script>
import AppError from '~/components/base/Error'

export default {
  components: { AppError },
  async fetch({ store, params }) {
    await store.dispatch('loadSingleProduct', params.id)
  },
  data: () => ({
    mainImage:
      'https://www.sensescotland.org.uk/wp-content/uploads/2019/04/imagenotavailable.png',
  }),
  computed: {
    product() {
      return this.$store.getters.singleProduct
    },
    images() {
      const images = []
      if (this.product.image_1) images.push(this.product.image_1)
      if (this.product.image_2) images.push(this.product.image_2)
      if (this.product.image_3) images.push(this.product.image_3)
      if (this.product.image_4) images.push(this.product.image_4)
      if (this.product.image_5) images.push(this.product.image_5)
      if (this.product.video) images.push(this.product.video)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (images[0]) this.mainImage = images[0]
      return images
    },
  },
  methods: {
    loadMainImage(image) {
      this.mainImage = image
    },
    updateCart(product1, operation1) {
      this.$store.dispatch('updateCarts', {
        operation: operation1,
        product: product1,
      })
    },
    checkout(product) {
      this.updateCart(product, 'add')
      this.$router.push('/checkout')
    },
  },
  head() {
    return {
      title: this.product.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product.description,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 1480px;
  }
}

@media (min-width: 960px) {
  .container {
    max-width: 1480px;
  }
}

#product table {
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  border-radius: 2px;
  border-spacing: 0;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.12);
  border-image: initial;
}

#product table tbody tr:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

#product table tbody tr:first-child {
  background: rgba(0, 0, 0, 0.12);
}

#product table tbody td {
  font-weight: 400;
  font-size: 13px;
  padding: 12px 8px;
}

#product table p {
  margin-bottom: 0;
}
</style>
