<template>
  <v-card flat>
    <v-card-text>
      <v-form v-model="valid" @submit.prevent="submitForm">
        <v-text-field
          v-if="hasName"
          v-model="userInfo.name"
          label="Name..."
          color="green"
          prepend-icon="mdi-face"
          :rules="[required('name')]"
        />

        <v-text-field
          id="username"
          v-model="userInfo.email"
          label="Email..."
          color="green"
          prepend-icon="mdi-email"
          :rules="[required('email'), emailFormat()]"
        />

        <Password v-model="userInfo.password" label="Password..." />

        <div v-if="registrationCheckboxes">
          <!-- v-model connects it with the userInfo hash, value makes the :rules work -->
          <v-checkbox
            v-model="userInfo.agreeToTerms"
            value="userInfo.agreeToTerms"
            class="mr-0"
            color="green"
            :rules="[
              required(
                'agreeToTerms',
                'You must agree to the terms and conditions and privacy policy'
              ),
            ]"
          >
            <template #label @click.stop>
              <span>
                I have read and agree to the
                <a
                  href="/policies/terms-and-conditions"
                  target="_blank"
                  @click.stop
                  >Terms and Conditions</a
                >
                and
                <a href="/policies/privacy-policy" target="_blank" @click.stop
                  >Privacy Policy</a
                >
              </span>
            </template>
          </v-checkbox>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        :disabled="!valid"
        color="primary accent-4"
        @click="submitForm(userInfo)"
        >{{ buttonText }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import validations from '@/utils/validations'
import Password from '@/components/auth/Password'
export default {
  components: {
    Password,
  },
  props: {
    submitForm: {
      type: Function,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    hasName: Boolean,
    registrationCheckboxes: Boolean,
  },
  data() {
    return {
      valid: false,
      userInfo: {
        name: '',
        email: '',
        password: '',
        agreeToTerms: false,
      },
      ...validations,
    }
  },
}
</script>

<style lang="scss" scoped></style>
