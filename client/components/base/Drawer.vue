<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.xsOnly"
    v-model="drawer"
    clipped
    color="success"
    fixed
    bottom
    app
    dark
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
  props: {
    links: {
      type: Array,
      required: true,
    },
    drawer: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
}
</script>

<style></style>
