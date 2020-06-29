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
      title: 'Account',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My Account Details',
        },
      ],
    }
  },
}
</script>

<style></style>
