<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.xsOnly"
    v-model="drawer"
    clipped
    fixed
    app
    temporary
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in links"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['links', 'drawer']
}
</script>

<style></style>
