<template>
  <v-form ref="form" lazy-validation @submit.prevent="register">
    <v-text-field
      v-model="name"
      label="Name..."
      prepend-icon="mdi-face"
      :rules="[rules.required]"
      required
    />
    <v-text-field
      v-model="email"
      label="Email..."
      prepend-icon="mdi-email"
      :rules="[rules.required, rules.email]"
      required
    />
    <v-text-field
      v-model="password"
      label="Password..."
      prepend-icon="mdi-lock"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      hint="At least 8 characters"
      counter
      required
      @click:append="show = !show"
    />
    <v-checkbox
      v-model="agree"
      required
      :rules="rules.required"
      label="I agree to the terms and conditions"
    />
    <v-btn text color="primary accent-4" @click="register">Register</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'RegisterUser',
  data: () => ({
    name: '',
    email: '',
    password: '',
    show: false,
    rules: {
      required: (value) => !!value || 'Required.',
      counter: (value) => value.length <= 20 || 'Max 20 characters',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    },
    agree: false
  }),
  methods: {
    register() {
      if (this.$refs.form.validate())
        this.$store
          .dispatch('register', {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({ name: 'Dashboard' })
          })
          .catch((err) => {
            console.log(err)
          })
    }
  }
}
</script>
