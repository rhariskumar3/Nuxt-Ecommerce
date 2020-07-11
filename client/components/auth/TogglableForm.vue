<template>
  <div>
    <div v-if="authScreen == 'login'">
      <h1>{{ loginPhrase }}</h1>
      <AuthForm class="mt-2" button-text="Login" :submit-form="loginUser" />
      <p>
        Don't have an account?
        <a @click="changeScreen('register')">Create one</a>
      </p>
    </div>
    <div v-else>
      <h1>{{ registerPhrase }}</h1>
      <AuthForm
        class="mt-2"
        button-text="Register"
        :submit-form="registerUser"
        :has-name="true"
        :registration-checkboxes="true"
      />
      <p>
        Already have an account?
        <a @click="changeScreen('login')">Login</a>
      </p>
    </div>
  </div>
</template>

<script>
import AuthForm from '@/components/auth/Form'
export default {
  components: {
    AuthForm,
  },
  props: {
    registerPhrase: {
      type: String,
      default: 'Register',
    },
    loginPhrase: {
      type: String,
      default: 'Login',
    },
    postRegisterAction: {
      type: Function,
      default: () => {},
    },
    postLoginAction: {
      type: Function,
      default: () => {},
    },
    startingScreen: {
      type: String,
      default: 'login',
    },
  },
  data() {
    const authScreen = this.$route.query.authScreen || this.startingScreen
    return {
      authScreen,
      loading: false,
    }
  },
  methods: {
    async loginUser(loginInfo) {
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: loginInfo,
        })
        this.$store.dispatch('snackbar/setSnackbar', {
          text: `Thanks for signing in, ${this.$auth.user.name}`,
        })
        this.postLoginAction()
      } catch {
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          text: 'There was an issue signing in.  Please try again.',
        })
      }
      this.loading = false
    },
    async registerUser(registrationInfo) {
      this.loading = true
      try {
        await this.$axios.post('/sessions/user', registrationInfo)
        await this.$auth.loginWith('local', {
          data: registrationInfo,
        })
        this.$store.dispatch('snackbar/setSnackbar', {
          text: `Thanks for signing up, ${this.$auth.user.name}`,
        })
        this.postRegisterAction()
      } catch {
        this.$store.dispatch('snackbar/setSnackbar', {
          color: 'red',
          text: 'There was an issue signing up.  Please try again.',
        })
      }
      this.loading = false
    },
    changeScreen(newScreen) {
      this.authScreen = newScreen
      this.$router.replace({
        query: {
          ...this.$route.query,
          authScreen: newScreen,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
