<template>
  <v-container fluid class="aligin-center justify-center">
    <v-row no-gutters>
      <div class="v-offset" style="width: 100%;">
        <v-card
          dark
          class="v-card--material__header elevation-2 green elevation-10"
        >
          <v-row style="margin-left: auto; padding-bottom: 4px;">
            <v-col cols="12" md="6">
              <span
                ><h4 class="title font-weight-light">
                  My Profile
                </h4></span
              >
            </v-col>
          </v-row>
        </v-card>
      </div>

      <v-flex class="xs12 mt-5 mx-lg-auto" md="4">
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="name"
              prepend-icon="mdi-face"
              :rules="[required('name')]"
              label="Name"
            />
            <v-text-field
              v-model="this.$auth.user.email"
              label="Email Address"
              prepend-icon="mdi-email"
              disabled
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :loading="loading">
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex class="xs12 mt-5 mx-lg-auto" md="4">
        <v-card>
          <v-card-title>Password</v-card-title>
          <v-card-text>
            <Password v-model="oldPassword" label="Current Password" />
            <Password v-model="newPassword" label="New Password" />
            <Password v-model="confirmPassword" label="Verify Password" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :loading="loading">
              Update password
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import validations from '@/utils/validations'
import Password from '@/components/auth/Password'
export default {
  middleware: 'auth-guard',
  components: {
    Password,
  },
  data: () => ({
    loading: false,
    name: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    ...validations,
  }),
  created() {
    this.name = this.$auth.user.name
  },
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
