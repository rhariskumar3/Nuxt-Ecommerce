<template>
  <div>
    <admin-drawer :links="links" :drawer="drawer" />
    <v-toolbar flat fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

      <v-spacer />

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon to="/" v-on="on">
            <v-icon>mdi-store</v-icon>
          </v-btn>
        </template>
        <span>Open Store</span>
      </v-tooltip>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon>
            <v-icon v-on="on">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import AdminDrawer from './AdminDrawer'

export default {
  components: { AdminDrawer },
  props: ['links'],
  data: () => ({
    drawer: false,
  }),
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
