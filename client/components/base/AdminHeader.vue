<template>
  <div>
    <admin-drawer :links="links" :drawer="drawer" />
    <v-toolbar flat fixed>
      <v-app-bar-nav-icon />

      <v-toolbar-title>{{ $nuxt.$route.name }}</v-toolbar-title>

      <v-spacer />

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon to="/" v-on="on">
            <v-icon>mdi-store</v-icon>
          </v-btn>
        </template>
        <span>Open Store</span>
      </v-tooltip>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import AdminDrawer from './AdminDrawer'
export default {
  components: { AdminDrawer },
  props: ['links']
}
</script>

<style scoped></style>
