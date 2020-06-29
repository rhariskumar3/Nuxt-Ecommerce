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

        <v-menu
          content-class="elevation-18"
          offset-y
          :close-on-content-click="true"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              class="text-none accent"
              fab
              dark
              small
              aria-label="Account"
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in authLinks"
              :key="index"
              :to="item.to"
              class="hidden-sm-and-down"
              @click="link.click ? link.click() : null"
            >
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          content-class="elevation-18 cart-popout"
          :close-on-content-click="true"
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
                :value="cartCount"
                :content="cartCount"
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
    drawer: false,
  }),
  computed: {
    carts() {
      return this.$store.getters.carts
    },
    cartCount() {
      return this.$store.getters.carts.reduce(
        (prev, current) => prev + current.count,
        0
      )
    },
    authLinks() {
      if (this.$auth.loggedIn) {
        const links = [{ text: this.$auth.user.email, to: '/account' }]
        if (this.$auth.user.admin) links.push({ text: 'Admin', to: '/admin' })
        links.push({
          text: 'Logout',
          click: () => {
            this.$auth.logout()
          },
        })
        return links
      } else return [{ text: 'Login/Register', to: '/auth' }]
    },
  },
  methods: {
    home() {
      this.$router.push('/')
    },
  },
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
