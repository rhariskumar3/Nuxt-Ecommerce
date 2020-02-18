<template>
  <v-app dark>
    <app-header :links="links" />
    <v-content>
      <nuxt />
    </v-content>
    <app-footer />
    <back-to-top id="back_to_bottom" visible-offset="500">
      <v-btn id="back_to_top" color="accent" class="ma-2 white--text">
        <v-icon>mdi-chevron-double-up</v-icon>
      </v-btn>
    </back-to-top>
  </v-app>
</template>

<script>
import AppHeader from '~/components/base/Header'
const AppFooter = () => import('~/components/base/Footer')

export default {
  components: { AppHeader, AppFooter },
  data: () => ({
    links: [
      {
        icon: 'mdi-apps',
        title: 'Home',
        to: '/'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Collections',
        to: '/collections'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Contact US',
        to: '/contact-us'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'About',
        to: '/about-us'
      }
    ]
  })
}
</script>

<style lang="scss">
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
