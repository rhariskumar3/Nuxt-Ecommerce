<template>
  <v-container fluid class="aligin-center justify-center">
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  middleware: 'auth-guard',
  head() {
    return {
      title: 'Orders',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My Orders',
        },
      ],
    }
  },
}
</script>

<style></style>
