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
                      New Category
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
                    <v-text-field v-model="category.title" label="Title" />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea
                      v-model="category.description"
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
    category: {
      title: '',
      description: '',
    },
    friendlyUrl: '',
    loading: false,
  }),
  methods: {
    save() {
      this.friendlyUrl = this.category.title
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
          .post('admin/category', this.category)
          .then((values) => {
            if (values.data.message) this.snack(values.data.message, 0)
            else {
              this.snack(this.category.title + ' created', 1)
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
      this.$store.dispatch('snackbar/setSnackbar', {
        color: state === 0 ? 'red' : 'green',
        text: message,
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
