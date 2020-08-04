<template>
  <div column style="height: 100vh;">
    <v-card class="mx-auto my-auto mt-12" max-width="500" :loading="loading">
      <v-img
        class="white--text"
        height="200px"
        :src="require('@/assets/banner/gardening_banner_1.jpg')"
      >
        <v-card-title class="align-end fill-height">Welcome</v-card-title>
        <v-card-subtitle v-if="$route.query.redirect">{{
          $route.query.redirect
        }}</v-card-subtitle>
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
