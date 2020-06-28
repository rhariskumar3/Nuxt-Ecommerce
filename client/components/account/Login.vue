<template>
  <v-card flat>
    <v-card-text>
      <v-form ref="loginForm" lazy-validation @submit.prevent="login">
        <v-text-field
          id="username"
          v-model="email"
          label="Email..."
          prepend-icon="mdi-email"
          :rules="[rules.required, rules.email]"
          required
        />
        <v-text-field
          id="current-password"
          v-model="password"
          label="Password..."
          prepend-icon="mdi-lock"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          hint="At least 8 characters"
          counter
          required
          @click:append="show1 = !show1"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary accent-4" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'LoginUser',
  data: () => ({
    email: '',
    password: '',
    show1: false,
    rules: {
      required: (value) => !!value || 'Required.',
      counter: (value) => value.length <= 20 || 'Max 20 characters',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
  }),
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        if (this.email === 'admin@demo.com' && this.password === '12345678')
          setTimeout(() => {
            // we simulate the async request with timeout.
            const auth = {
              accessToken: 'someStringGotFromApiServiceWithAjax',
            }
            this.$store.commit('setAuth', auth) // mutating to store for client rendering
            Cookie.set('auth', auth) // saving token in cookie for server rendering
            this.$router.push('/admin/dashboard')
          }, 1000)
      }
    },
  },
}
</script>
