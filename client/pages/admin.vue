<template>
  <v-container>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth-admin'],
  layout: 'admin',
}
</script>

<style lang="scss" scoped></style>
