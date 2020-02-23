<template>
  <div>
    <app-drawer :links="links" :drawer="drawer" />
    <v-app-bar
      app
      dark
      elevate-on-scroll
      extended
      fixed
      class="v-app-bar--hide-shadow primary"
      hide-on-scroll
    >
      <v-container class="fill-height px-0">
        <v-toolbar-title
          white-text
          class="display-1 font-weight-medium pb-0 text-uppercase align-self-center"
          @click="home"
          v-text="this.$store.getters.shopData.name"
        />

        <v-spacer />

        <v-btn icon class="theme--dark" to="/account">
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-menu
          content-class="elevation-18 cart-popout"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              class="text-none accent"
              fab
              dark
              small
              aria-label="Cart"
              v-on="on"
            >
              <v-badge
                left
                color="accent"
                :value="carts.length"
                :content="carts.length"
                ><v-icon>mdi-cart</v-icon></v-badge
              >
            </v-btn>
          </template>
          <app-cart v-if="carts.length > 0" :carts="carts" />
        </v-menu>
      </v-container>
      <template v-slot:extension>
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.xsOnly"
          class="hidden-md-and-up"
          @click.stop="drawer = !drawer"
        />
        <v-tabs
          centered
          dark
          slider-color="transparent"
          class="hidden-sm-and-down white--text secondary"
        >
          <v-tab v-for="(link, i) in links" :key="i" :to="link.to" text>
            {{ link.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import AppCart from '~/components/checkout/Cart'
import AppDrawer from '~/components/base/Drawer'
export default {
  components: { AppDrawer, AppCart },
  props: ['links'],
  data: () => ({
    drawer: false
  }),
  computed: {
    carts() {
      return this.$store.getters.carts
    }
  },
  methods: {
    home() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-popout {
  max-height: 600px;
  min-width: 340px !important;
  max-width: 540px;
  top: 64px !important;
  /*left: 980px !important;*/
  right: 98px !important;
  transform-origin: right top !important;
  z-index: 16 !important;
}
@media screen and (max-width: 960px) {
  .cart-popout {
    max-height: 400px;
    min-width: 100px;
    max-width: 300px;
    top: 56px;
    left: 95px;
    transform-origin: right top;
    z-index: 16;
  }
}
</style>
