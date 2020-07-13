<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <v-card
          light
          class="elevation-2"
          style="margin-bottom: 24px; margin-top: 48px;"
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
                    <v-textarea v-model="product.summary" label="Summary" />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea
                      v-model="product.description"
                      label="Description"
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
                    <v-select label="Category" />
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
                    <v-select label="Tax" />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field
                      v-model="product.shippingFee"
                      label="Shipping Price"
                      type="number"
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
                      label="Meta Title"
                    />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea
                      v-model="product.metaDescription"
                      label="Meta Description"
                      rows="2"
                    />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-text-field
                      v-model="friendlyUrl"
                      disabled
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
      minimumQuantity: '',
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
  }),
  methods: {
    async save() {
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
      await this.$store.dispatch('setAdminProducts', this.product)
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
