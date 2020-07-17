<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '@/components/base/Snackbar'
export default {
  name: 'Empty',
  components: { Snackbar },
}
</script>

<style scoped></style>
