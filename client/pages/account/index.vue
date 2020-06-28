<template>
  <v-container fluid class="aligin-center justify-center">
    <v-row class="justify-center">
      <v-col cols="12" md="4">
        <anonymous-account />
      </v-col>
    </v-row>
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
          content: 'My Account Details',
        },
      ],
    }
  },
}
</script>

<style></style>
