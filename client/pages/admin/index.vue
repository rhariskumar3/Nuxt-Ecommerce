<template>
  <div column style="height: 100vh;">
    <v-card class="mx-auto my-auto mt-12" max-width="500">
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title class="align-end fill-height">Welcome</v-card-title>
      </v-img>
      <v-card-text>
        <login />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Login from '../../components/account/Login'
export default {
  components: { Login },
  layout: 'empty'
}
</script>

<style scoped></style>
