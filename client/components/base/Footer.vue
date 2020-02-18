<template>
  <v-footer dark class="py-12 v-footer--inset">
    <v-container class="px-0">
      <v-row>
        <v-col md="5" cols="12">
          <strong class="mb-3 d-block"
            >About {{ this.$store.getters.shopData.name }}</strong
          >
          <div class="body-2 pr-10">
            {{ this.$store.getters.shopData.description }}
          </div>
        </v-col>
        <v-col md="7" cols="12">
          <v-row>
            <v-col v-for="i in 4" :key="i" cols="6" md="3">
              <strong class="d-block mb-6">General</strong>
              <div class="body-2 mb-4">
                <a href="/about-us" class="text-capitalize">About Us</a>
              </div>
              <div class="body-2 mb-4">
                <a href="/contact-us" class="text-capitalize">Contact Us</a>
              </div>
              <div class="body-2 mb-4">
                <a href="/thank-you" class="text-capitalize">Thank You</a>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mb-5 my-md-5" />
      <v-row>
        <v-col class="ml-auto mr-auto ml-md-0 d-flex align-center col-auto">
          {{ this.$store.getters.shopData.name }} Enterprises
        </v-col>
        <v-col class="ml-auto mr-auto mr-md-0 col-auto">
          &copy; Copyright {{ new Date().getFullYear() }}
          {{ this.$store.getters.shopData.name }}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
a {
  color: #fff;
  text-decoration: none;
}

@media (min-width: 1264px) {
  .container {
    max-width: 1480px !important;
  }
}
@media (min-width: 960px) {
  .container {
    max-width: 1480px !important;
  }
}
</style>
