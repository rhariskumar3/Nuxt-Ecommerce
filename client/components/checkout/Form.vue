<template>
  <v-card v-if="!this.$auth.loggedIn" to="/auth"
    ><v-card-title> Please login/register to checkout </v-card-title>
  </v-card>
  <!-- <v-card v-else-if="shippers.length == 0"
    ><v-card-title>
      No Shipping mathods found. Please try again later
    </v-card-title>
  </v-card>
  <v-card v-else-if="paymentMethods.length == 0" ]
    ><v-card-title>
      No Payment mathods found. Please try again later
    </v-card-title>
  </v-card> -->
  <v-stepper v-else v-model="e6" vertical>
    <v-stepper-step complete step="1">
      Contact information
    </v-stepper-step>

    <v-stepper-step :complete="e6 > 2" step="2"
      >Delivery Address</v-stepper-step
    >
    <v-stepper-content step="2">
      <v-card v-if="addresses.length == 0" to="/addresses"
        ><v-card-title> Please add address to checkout </v-card-title>
      </v-card>
      <v-form v-else ref="shippingAddressForm">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
                v-model="deliveryAddress"
                :items="addresses"
                item-text="id"
                label="Shipping Address"
                return-object
                solo
              >
                <template slot="selection" slot-scope="{ item }">
                  {{ item.name }} - {{ item.city.name }} -
                  {{ item.state.name }} - {{ item.pinCode }}
                </template>
                <template slot="item" slot-scope="{ item }">
                  {{ item.name }} - {{ item.city.name }} -
                  {{ item.state.name }} - {{ item.pinCode }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="deliveryAddress.name"
                :rules="nameRules"
                label="Name"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="deliveryAddress.address1"
                :rules="requiredRules"
                label="Address"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="deliveryAddress.address2"
                disabled
                label="Apartment, suite, etc. (optional)"
                dense
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="deliveryAddress.city.name"
                :rules="requiredRules"
                label="City"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="deliveryAddress.state.name"
                :rules="requiredRules"
                label="State"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="deliveryAddress.country.name"
                :rules="requiredRules"
                label="Country"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="deliveryAddress.pinCode"
                :rules="requiredRules"
                label="PIN code"
                type="number"
                counter="6"
                dense
                disabled
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
        </v-container>
      </v-form>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">Billing Address</v-stepper-step>
    <v-stepper-content step="3">
      <v-card v-if="addresses.length == 0" to="/addresses"
        ><v-card-title> Please add address to checkout </v-card-title>
      </v-card>
      <v-form v-else ref="billingAddressForm">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
                v-model="invoiceAddress"
                :items="addresses"
                item-text="id"
                label="Billing Address"
                return-object
                solo
              >
                <template slot="selection" slot-scope="{ item }">
                  {{ item.name }} - {{ item.city.name }} -
                  {{ item.state.name }} - {{ item.pinCode }}
                </template>
                <template slot="item" slot-scope="{ item }">
                  {{ item.name }} - {{ item.city.name }} -
                  {{ item.state.name }} - {{ item.pinCode }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="invoiceAddress.name"
                :rules="nameRules"
                label="Name"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="invoiceAddress.address1"
                :rules="requiredRules"
                label="Address"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="invoiceAddress.address2"
                label="Apartment, suite, etc. (optional)"
                dense
                disabled
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="invoiceAddress.city.name"
                :rules="requiredRules"
                label="City"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="invoiceAddress.state.name"
                :rules="requiredRules"
                label="State"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="invoiceAddress.country.name"
                :rules="requiredRules"
                label="Country"
                dense
                disabled
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="invoiceAddress.pinCode"
                :rules="requiredRules"
                label="PIN code"
                type="number"
                counter="6"
                dense
                disabled
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
            <v-list-item
              v-for="(item, i) in shippers"
              :key="i"
              @click="shippingMethod(item)"
            >
              <v-list-item-icon>
                <v-avatar size="36px">
                  <img v-if="item.logo" :src="item.logo" alt="Logo" />
                  <v-icon v-else>mdi-truck-fast</v-icon>
                </v-avatar>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
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
            <v-list-item
              v-for="(item, i) in paymentMethods"
              :key="i"
              @click="paymentMethod(item)"
            >
              <v-list-item-icon>
                <v-avatar size="36px">
                  <img v-if="item.logo" :src="item.logo" alt="Logo" />
                  <v-icon v-else>mdi-credit-card-multiple</v-icon>
                </v-avatar>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
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
  props: {
    addresses: {
      type: Array,
      required: false,
      default: () => [],
    },
    carts: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    e6: 2,
    requiredRules: [(v) => !!v || 'The input is required'],
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length >= 4) || 'Name must contain more than 4 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    name: '',
    email: '',
    isShippingAddressBillingAddressSame: false,
    deliveryAddress: {
      city: {
        name: '',
      },
      state: {
        name: '',
      },
      country: {
        name: '',
      },
    },
    invoiceAddress: {
      city: {
        name: '',
      },
      state: {
        name: '',
      },
      country: {
        name: '',
      },
    },
    order: {
      carrierId: '',
      addressDelivery: '',
      addressInvoice: '',
      payment: '',
      paymentId: '',
    },
  }),
  computed: {
    paymentMethods() {
      return this.$store.state.paymentMethods
    },
    shippers() {
      return this.$store.state.carriers
    },
  },
  watch: {
    deliveryAddress(val) {
      this.order.addressDelivery = val.id
    },
    invoiceAddress(val) {
      this.order.addressInvoice = val.id
    },
  },
  mounted() {
    console.log(this.addresses)
  },
  methods: {
    shippingAddressSubmit() {
      if (this.$refs.shippingAddressForm.validate()) {
        if (this.isShippingAddressBillingAddressSame) {
          this.invoiceAddress = this.deliveryAddress
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
      if (this.shippers.length > 0) {
        if (!this.order.carrierId) this.order.carrierId = this.shippers[0].id
        this.e6 = 5
      } else this.$notifier.error(`No shipping methods found`)
    },
    paymentMethodSubmit() {
      if (this.paymentMethods.length > 0) {
        if (!this.order.payment)
          this.order.payment = this.paymentMethods[0].name
        this.createOrder()
      } else this.$notifier.error(`No payment methods found`)
    },
    async createOrder() {
      try {
        this.$nuxt.$loading.start()
        this.order.userId = this.$auth.user.id
        this.order.carts = this.carts
        await this.$axios.post('/order', this.order).then((result) => {
          if (result.data.status) this.openPayment(result.data.data)
          else this.$notifier.error(result.data.message)
        })
      } catch (error) {
        this.$notifier.error(
          'There was an issue create order.  Please try again.'
        )
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    shippingMethod(val) {
      this.order.carrierId = val.id
    },
    paymentMethod(val) {
      this.order.payment = val.name
    },
    openPayment(payData) {
      const self = this
      const options = {
        key: payData.key,
        amount: payData.amount,
        currency: payData.currency,
        description: payData.desc,
        order_id: payData.id,
        handler(response) {
          self.paymentUpdate(payData, response)
        },
        modal: {
          ondismiss() {
            self.$notifier.error('Payment Failed')
          },
        },
        prefill: {
          name: this.invoiceAddress.name,
          email: this.$auth.user.email,
          contact: this.invoiceAddress.mobile,
        },
        notes: {
          address: payData.reference,
        },
      }
      // eslint-disable-next-line no-undef
      new Razorpay(options).open()
    },
    async paymentUpdate(order, payment) {
      try {
        this.$nuxt.$loading.start()
        const data = {}
        data.userId = this.$auth.user.id
        data.reference = order.reference
        data.paymentId = payment.razorpay_payment_id
        data.orderId = payment.razorpay_order_id
        data.sign = payment.razorpay_signature

        await this.$axios.put('/order', data).then((result) => {
          if (result.data.status) {
            this.$notifier.success(result.data.message)
            this.order = {}
            this.$store.dispatch('updateCarts', {
              operation: 'clean',
              product: null,
            })
            this.$router.push('/')
          } else this.$notifier.error(result.data.message)
        })
      } catch (error) {
        this.$notifier.error(
          'There was an issue create order.  Please try again.'
        )
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
  head: {
    script: [
      {
        src: 'https://checkout.razorpay.com/v1/checkout.js',
      },
    ],
  },
}
</script>

<style></style>
