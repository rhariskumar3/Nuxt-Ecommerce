<template>
  <section>
    <banner :detail="banner" />
    <v-container id="products" fluid>
      <v-container id="collections-collections" fluid>
        <v-container>
          <v-row class="justify-center">
            <v-col
              v-for="(collection, i) in collections"
              :key="i"
              class="col-auto primary--text"
            >
              <v-card :href="'/collections/' + collection.friendly_url">
                <v-img
                  :src="collection.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  style="height: 168px; min-width: 168px; width: 168px;"
                >
                  <v-overlay class="text-center text-capitalize" absolute dark>
                    <div
                      class="v-overlay__scrim transparent"
                      style="opacity: 1;"
                    />
                    <v-card-title>{{ collection.title }}</v-card-title>
                  </v-overlay>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-container>
  </section>
</template>

<script>
import Banner from '~/components/product/Banner'

export default {
  components: {
    Banner,
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchCollections')
  },
  data: () => ({
    banner: {
      title: 'Collections',
      image:
        'https://cdn.shopify.com/s/files/1/2695/0984/collections/Ogio_Open_800px.png?v=1568487181',
    },
  }),
  computed: {
    collections() {
      return this.$store.getters.collections
    },
  },
  head() {
    return {
      title: 'Collections',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'All ' + this.$store.getters.shopData.name + ' Collections',
        },
      ],
    }
  },
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  #products,
  #collections-collections {
    padding: 12px 0;
  }
}
</style>
