<template>
  <div column style="height: 100vh;">
    <v-card class="mx-auto my-auto mt-12" max-width="500" :loading="loading">
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title class="align-end fill-height"
          >Welcome {{ $route.query.redirect }}</v-card-title
        >
      </v-img>
      <v-card-text>
        <UserAuthTogglableForm
          login-phrase="Login"
          register-phrase="Register"
          :loading="loading"
          :post-login-action="redirect"
          :post-register-action="redirect"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import UserAuthTogglableForm from '@/components/auth/TogglableForm'
export default {
  components: {
    UserAuthTogglableForm,
  },
  layout: 'empty',
  data: () => ({
    loading: false,
  }),
  methods: {
    redirect() {
      const REDIRECT_URI = this.$route.query.redirect || '/'
      this.$router.push(REDIRECT_URI)
    },
  },
}
</script>

<style lang="scss" scoped></style>
