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
      title: 'Addresses',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Saved Addresses',
        },
      ],
    }
  },
}
</script>

<style></style>
