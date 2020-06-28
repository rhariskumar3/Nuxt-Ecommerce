<template>
  <v-col cols="12">
    <div>
      <v-container id="carousel" class="px-0">
        <v-row
          :class="{
            'px-2': $vuetify.breakpoint.smAndDown,
          }"
        >
          <v-col cols="12" lg="8">
            <v-card class="slider">
              <v-carousel class="slider" hide-delimiters cycle>
                <v-carousel-item
                  v-for="(item, i) in carousels"
                  :key="i"
                  :src="item.image"
                >
                  <v-container fluid class="fill-height white--text">
                    <v-row
                      class="text-center hidden-sm-and-down align-center justify-center"
                    >
                      <v-col cols="8">
                        <v-responsive
                          class="mx-auto pa-1"
                          style="max-width: 500px;"
                        >
                          <h2 v-if="item.title" class="display-2 mb-6">
                            {{ item.title }}
                          </h2>
                          <div
                            v-if="item.sub_title"
                            class="display-3 font-weight-medium font-italic mb-12"
                          >
                            {{ item.sub_title }}
                          </div>
                          <v-btn
                            v-if="item.action"
                            router
                            :to="item.url"
                            class="accent"
                          >
                            {{ item.action }}
                          </v-btn>
                        </v-responsive>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-col>
          <v-col cols="12" lg="4" class="d-flex flex-wrap pa-0">
            <v-row class="ma-0" style="max-width: 100%;">
              <v-col cols="12" md="6" lg="12" class="d-md-flex">
                <v-card
                  href="/product/premium-vuetify-mouse-pad"
                  class="d-flex grow align-center flex-wrap"
                >
                  <v-col cols="12" class="mx-auto text-center text-md-left">
                    <div class="title font-weight-bold pl-2 mb-1">
                      Premium Vuetify Mouse Pad
                    </div>
                    <div class="display-2 font-italic font-weight-black mb-1">
                      Trending Product
                    </div>
                  </v-col>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" lg="12" class="d-md-flex">
                <v-card
                  href="/product/premium-vuetify-mouse-pad"
                  class="d-flex grow align-center flex-wrap"
                >
                  <v-col cols="12" class="mx-auto text-center text-md-left">
                    <div class="title font-weight-bold pl-2 mb-1">
                      Vuetify Dark Stickers
                    </div>
                    <div class="display-2 font-italic font-weight-black mb-1">
                      Trending Product
                    </div>
                  </v-col>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-col>
</template>

<script>
export default {
  computed: {
    carousels() {
      return this.$store.getters.carousels
    },
  },
}
</script>

<style lang="scss" scoped>
.slider {
  max-height: 600px !important;
}

@media only screen and (max-width: 768px) {
  .slider {
    height: 300px !important;
    max-height: 300px !important;
  }
}
</style>
