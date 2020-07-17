<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <v-card
          light
          class="elevation-2"
          style="margin-bottom: 24px; margin-top: 48px;"
          :loading="loading"
        >
          <div class="v-offset" style="top: -24px; margin-bottom: -24px;">
            <v-card
              dark
              class="v-card--material__header elevation-2 green elevation-10"
            >
              <v-row>
                <v-col cols="12" md="3">
                  <span
                    ><h4 class="title font-weight-light">
                      New Product
                    </h4></span
                  >
                </v-col>
              </v-row>
            </v-card>
          </div>
          <v-card-text>
            <v-form>
              <v-container class="py-0">
                <v-layout wrap>
                  <v-flex class="xs12" md="4">
                    <v-text-field v-model="product.name" label="Name" />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea
                      v-model="product.summary"
                      persistent-hint
                      label="Summary"
                      hint="Fill in a striking short description of the product"
                      rows="2"
                      maxlength="255"
                    />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea
                      v-model="product.description"
                      label="Description"
                      counter
                      maxlength="500"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-file-input
                      label="Main Image"
                      accept="image/png, image/jpeg"
                      prepend-icon="mdi-camera"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-file-input
                      label="Image 1"
                      accept="image/png, image/jpeg"
                      prepend-icon="mdi-camera"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-file-input
                      label="Image 2"
                      accept="image/png, image/jpeg"
                      prepend-icon="mdi-camera"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-file-input
                      label="Image 3"
                      accept="image/png, image/jpeg"
                      prepend-icon="mdi-camera"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-file-input
                      label="Image 4"
                      accept="image/png, image/jpeg"
                      prepend-icon="mdi-camera"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-file-input
                      label="Video"
                      accept="video/mp4"
                      prepend-icon="mdi-video"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-select
                      v-model="product.categoryId"
                      label="Category"
                      :items="categories"
                      item-text="title"
                      item-value="id"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-text-field
                      v-model="product.quantity"
                      label="Quantity"
                      type="number"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-text-field
                      v-model="product.minimumQuantity"
                      label="Minimum Quantity"
                      hint="The minimum quantity required to buy this product (set to 1 to disable this feature)"
                      type="number"
                    />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field
                      v-model="product.price"
                      label="Price"
                      type="number"
                      suffix="₹"
                    />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-select
                      v-model="product.taxId"
                      label="Tax"
                      :items="taxes"
                      item-text="name"
                      item-value="id"
                    />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field
                      v-model="product.shippingFee"
                      label="Shipping Price"
                      type="number"
                      hint="Does this product incur additional shipping costs?"
                      suffix="₹"
                    />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field
                      v-model="product.weight"
                      label="Weight"
                      type="number"
                      suffix="Kg"
                    />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field
                      v-model="product.length"
                      label="Length"
                      type="number"
                      suffix="In"
                    />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field
                      v-model="product.breadth"
                      label="Breadth"
                      type="number"
                      suffix="In"
                    />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field
                      v-model="product.height"
                      label="Height"
                      type="number"
                      suffix="In"
                    />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field
                      v-model="product.dia"
                      label="Dia"
                      type="number"
                      suffix="In"
                    />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-text-field
                      v-model="product.metaTitle"
                      persistent-hint
                      hint="Public title for the product page and for search engines."
                      label="Meta Title"
                    />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea
                      v-model="product.metaDescription"
                      persistent-hint
                      label="Meta Description"
                      hint="This description will appear in search engines."
                      rows="2"
                    />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-text-field
                      v-model="friendlyUrl"
                      disabled
                      persistent-hint
                      hint="This is the human-readable URL, as generated from the product's name."
                      label="Friendly URL"
                    />
                  </v-flex>
                  <v-flex class="xs12"
                    ><v-btn @click="save">Create</v-btn></v-flex
                  >
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async fetch({ store, params }) {
    await store.dispatch('fetchAdminCollections')
    await store.dispatch('fetchAdminTax')
  },
  layout: 'admin',
  data: () => ({
    product: {
      name: '',
      summary: '',
      description: '',
      categoryId: '',
      mediaId: '',
      quantity: '',
      price: '',
      taxId: '',
      minimumQuantity: '1',
      length: '',
      breadth: '',
      width: '',
      dia: '',
      weight: '',
      shippingFee: '',
      metaTitle: '',
      metaDescription: '',
    },
    friendlyUrl: '',
    loading: false,
  }),
  computed: {
    categories() {
      return this.$store.getters.adminCollections
    },
    taxes() {
      return this.$store.getters.adminTax
    },
  },
  methods: {
    save() {
      this.friendlyUrl = this.product.name
        .toString() // Convert to string
        .normalize('NFD') // Change diacritics
        .replace(/[\u0300-\u036F]/g, '') // Remove illegal characters
        .replace(/\s+/g, '-') // Change whitespace to dashes
        .toLowerCase() // Change to lowercase
        .replace(/&/g, '-and-') // Replace ampersand
        // eslint-disable-next-line no-useless-escape
        .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
        .replace(/-+/g, '-') // Remove duplicate dashes
        .replace(/^-*/, '') // Remove starting dashes
        .replace(/-*$/, '') // Remove trailing dashes

      this.loading = true
      try {
        this.$axios
          .post('admin/products', this.product)
          .then((values) => {
            if (values.data.message) this.snack(values.data.message, 0)
            else {
              this.snack(this.product.name + ' created', 1)
              this.$router.back()
            }
          })
          .catch((err) => {
            this.snack(err, 0)
          })
      } catch {}
      this.loading = false
    },
    snack(message, state) {
      this.$notifier.showMessage({
        text: message,
        color: state === 0 ? 'red' : 'green',
      })
    },
  },
}
</script>

<style scoped>
.v-card > :first-child:not(.v-btn):not(.v-chip) {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.v-card .v-offset {
  top: -20px !important;
  margin-bottom: -20px !important;
}
.v-offset {
  margin: 0 auto;
  max-width: calc(100% - 32px);
  position: relative;
}
.v-card .v-offset .v-card--material__header.v-card {
  padding: 15px;
}
.v-card .title {
  margin-top: 0;
  line-height: 1.5em !important;
  letter-spacing: 0 !important;
  font-size: 1.125rem !important;
  margin-bottom: 5px !important;
}
.v-card .category {
  margin: 0;
}
.category {
  font-size: 14px;
}
</style>
