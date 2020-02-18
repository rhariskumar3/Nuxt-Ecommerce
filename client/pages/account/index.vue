<template>
  <v-container fluid class="aligin-center justify-center">
    <anonymous-account />
  </v-container>
</template>

<script>
import AnonymousAccount from '~/components/account/AnonymousAccount'
export default {
  components: { AnonymousAccount },
  head() {
    return {
      title: 'Account',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My Account Details'
        }
      ]
    }
  }
}
</script>

<style></style>
