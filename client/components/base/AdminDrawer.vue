<template>
  <v-navigation-drawer
    v-model="drawer"
    color="success"
    mini-variant
    expand-on-hover
    absolute
    dark
    app
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <img :src="this.$store.getters.shopData.logo" alt="logo" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>{{
            this.$store.getters.shopData.name
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in links" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['links', 'drawer'],
}
</script>

<style scoped></style>
