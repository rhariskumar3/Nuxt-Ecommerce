<template>
  <section>
    <v-card flat class="transparent" style="transform-origin: center top 0px;">
      <v-img
        id="banner"
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg.jpg"
        class="white--text text-center"
      >
        <v-overlay
          class="text-center text-capitalize"
          opacity="0.8"
          absolute
          dark
        >
          <h2
            class="mb-3 font-italic font-weight-black"
            :class="{
              'displat-1': $vuetify.breakpoint.smAndDown,
              'displat-4': $vuetify.breakpoint.mdAndUp,
            }"
          >
            About {{ this.$store.getters.shopData.name }}
          </h2>
        </v-overlay>
      </v-img>
    </v-card>
    <v-container id="about" fluid>
      <v-container id="intro" fluid>
        <v-container>
          <v-row class="align-center">
            <v-col cols="12" md="6">
              <h2 class="font-weight-bold mb-6 display-2">
                <em>
                  Supercharge your
                  {{ this.$store.getters.shopData.name }} experience with
                  Premium Themes and official Apparel
                </em>
              </h2>
              <h3 class="headline font-weight-medium mb-4 undefined">
                Kickstart your next great application and support OSS all in the
                same process.
              </h3>
              <h3 class="body-1 font-weight-light mb-6">
                {{ this.$store.getters.shopData.description }}
              </h3>
            </v-col>
            <v-col class="hidden-xs-only" cols="12" md="6">
              <v-img
                style="max-width: 400px;"
                :src="this.$store.getters.shopData.logo"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-container>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'About Us',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'about us',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#banner {
  min-height: 20vh;
  max-height: 300px;
}

@media only screen and (max-width: 768px) {
  #banner {
    min-height: 5vh;
    max-height: 150px;
  }
}

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
</style>
