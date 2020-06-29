<template>
  <div>
    <v-text-field
      id="current-password"
      :value="value"
      :label="label"
      color="green"
      prepend-icon="mdi-lock"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      counter
      :rules="chosenValidations"
      @input="$emit('input', $event)"
      @click:append="showPassword = !showPassword"
    />
  </div>
</template>

<script>
import validations from '@/utils/validations'
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Password',
    },
    passwordRequired: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ...validations,
      showPassword: false,
    }
  },
  computed: {
    chosenValidations() {
      const validations = []
      if (this.passwordRequired) {
        validations.push(this.required('password'))
      }
      validations.push(this.minLength('password', 8))
      return validations
    },
  },
}
</script>

<style lang="scss" scoped></style>
