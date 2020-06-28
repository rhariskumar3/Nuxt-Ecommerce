<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Contact information
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-form ref="contactInfoForm" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="contactInfo.email"
                :rules="emailRules"
                label="E-mail"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="contactInfo.firstName"
                :rules="nameRules"
                label="First Name"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="contactInfo.lastName"
                :rules="requiredRules"
                label="Last Name"
                dense
                required
              />
            </v-col>
            <v-col cols="12" col>
              <v-text-field
                v-model="contactInfo.mobile"
                :rules="requiredRules"
                label="Mobile"
                dense
                required
              />
            </v-col>
          </v-row>
          <v-btn color="primary" class="mr-4" @click="contactInfoSubmit">
            Continue
          </v-btn>
        </v-container>
      </v-form>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2"
      >Shipping Address</v-stepper-step
    >
    <v-stepper-content step="2">
      <v-form ref="shippingAddressForm">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="shippingAddress.firstName"
                :rules="nameRules"
                label="First Name"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="shippingAddress.lastName"
                :rules="requiredRules"
                label="Last Name"
                dense
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="shippingAddress.address"
                :rules="requiredRules"
                label="Address"
                dense
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="shippingAddress.address2"
                label="Apartment, suite, etc. (optional)"
                dense
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="shippingAddress.city"
                :rules="requiredRules"
                label="City"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="shippingAddress.state"
                :rules="requiredRules"
                label="State"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="shippingAddress.country"
                :rules="requiredRules"
                label="Country"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="shippingAddress.pinCode"
                :rules="requiredRules"
                label="PIN code"
                type="number"
                counter="6"
                dense
                required
              />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="isShippingAddressBillingAddressSame"
                label="Billing address is same as Shipping address"
                dense
              />
            </v-col>
          </v-row>
          <v-btn color="primary" class="mr-4" @click="shippingAddressSubmit">
            Continue
          </v-btn>
          <v-btn text @click="e6 = 1">Back</v-btn>
        </v-container>
      </v-form>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">Billing Address</v-stepper-step>
    <v-stepper-content step="3">
      <v-form ref="billingAddressForm">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="billingAddress.firstName"
                :rules="nameRules"
                label="First Name"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="billingAddress.lastName"
                :rules="requiredRules"
                label="Last Name"
                dense
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="billingAddress.address"
                :rules="requiredRules"
                label="Address"
                dense
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="billingAddress.address2"
                label="Apartment, suite, etc. (optional)"
                dense
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="billingAddress.city"
                :rules="requiredRules"
                label="City"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="billingAddress.state"
                :rules="requiredRules"
                label="State"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="billingAddress.country"
                :rules="requiredRules"
                label="Country"
                dense
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="billingAddress.pinCode"
                :rules="requiredRules"
                label="PIN code"
                type="number"
                counter="6"
                dense
                required
              />
            </v-col>
          </v-row>
          <v-btn color="primary" class="mr-4" @click="billingAddressSubmit">
            Continue
          </v-btn>
          <v-btn text @click="e6 = 2">Back</v-btn>
        </v-container>
      </v-form>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 4" step="4">Shipping method</v-stepper-step>
    <v-stepper-content step="4">
      <v-card flat>
        <v-list>
          <v-list-item-group mandatory>
            <v-list-item v-for="(item, i) in shippers" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.label" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-btn color="primary" @click="shippingMethodSubmit">Continue</v-btn>
      <v-btn text @click="e6 = 3">Back</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 5" step="5">Payment method</v-stepper-step>
    <v-stepper-content step="5">
      <v-card flat>
        <v-list>
          <v-list-item-group mandatory>
            <v-list-item v-for="(item, i) in paymentMethods" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.label" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-checkbox
          :rules="requiredRules"
          label="Accept Privacy Policy"
          mandatory
        />
      </v-card>
      <v-btn color="primary" @click="paymentMethodSubmit">Submit</v-btn>
      <v-btn text @click="e6 = 4">Back</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  data: () => ({
    e6: 1,
    requiredRules: [(v) => !!v || 'The input is required'],
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length >= 4) || 'Name must contain more than 4 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    contactInfo: {
      email: '',
      firstName: '',
      lastName: '',
      mobile: '',
    },
    shippingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      pinCode: '',
    },
    billingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      pinCode: '',
    },
    name: '',
    email: '',
    isShippingAddressBillingAddressSame: false,
  }),
  computed: {
    paymentMethods() {
      return this.$store.state.PAYMENT_METHODS
    },
    shippers() {
      return this.$store.state.SHIPPING_METHODS
    },
  },
  methods: {
    contactInfoSubmit() {
      if (this.$refs.contactInfoForm.validate()) {
        this.e6 = 2
      }
    },
    shippingAddressSubmit() {
      if (this.$refs.shippingAddressForm.validate()) {
        if (this.isShippingAddressBillingAddressSame) {
          this.billingAddress.firstName = this.shippingAddress.firstName
          this.billingAddress.lastName = this.shippingAddress.lastName
          this.billingAddress.address = this.shippingAddress.address
          this.billingAddress.address2 = this.shippingAddress.address2
          this.billingAddress.city = this.shippingAddress.city
          this.billingAddress.state = this.shippingAddress.state
          this.billingAddress.country = this.shippingAddress.country
          this.billingAddress.pinCode = this.shippingAddress.pinCode
          this.e6 = 4
        } else this.e6 = 3
      }
    },
    billingAddressSubmit() {
      if (this.$refs.billingAddressForm.validate()) {
        this.e6 = 4
      }
    },
    shippingMethodSubmit() {
      this.e6 = 5
    },
    paymentMethodSubmit() {
      const result = confirm('Confirm Purchase?')
      if (result) {
        this.$store.dispatch('updateCarts', {
          operation: 'clean',
          product: null,
        })
        this.$router.push('/')
      }
    },
  },
}
</script>

<style></style>
