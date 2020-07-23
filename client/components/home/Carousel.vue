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
                            v-if="item.subTitle"
                            class="display-3 font-weight-medium font-italic mb-12"
                          >
                            {{ item.subTitle }}
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
              <v-col
                v-for="(item, i) in featured"
                :key="i"
                cols="12"
                md="6"
                lg="12"
                class="d-md-flex"
              >
                <v-card :to="item.url" class="d-flex grow flex-wrap">
                  <v-img :src="item.image">
                    <v-card-text class="title white--text">
                      <v-row
                        class="fill-height flex-column text-center align-center justify-center text-xs-center"
                        justify="space-between"
                      >
                        <div
                          v-if="item.subTitle"
                          class="title font-weight-bold pl-2 mb-1"
                        >
                          {{ item.subTitle }}
                        </div>
                        <div
                          v-if="item.title"
                          class="display-2 font-italic font-weight-black mb-1"
                        >
                          {{ item.title }}
                        </div>
                      </v-row>
                    </v-card-text>
                  </v-img>
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
      return this.$store.getters.carousels.filter(
        (element) => element.featured === false
      )
    },
    featured() {
      const list = this.$store.getters.carousels
        .filter((element) => element.featured === true)
        .slice(0, 2)
      return list.length > 0 ? list : this.$store.getters.carousels.slice(0, 2)
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
