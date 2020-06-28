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
                  <span v-if="shopData.id != -1"
                    ><h4 class="title font-weight-light">
                      Update Shop Data
                    </h4></span
                  >
                  <span v-else
                    ><h4 class="title font-weight-light">
                      Add Shop Data
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
                  <v-flex class="xs1" md="4">
                    <v-text-field disabled label="ID" :value="shopData.id" />
                  </v-flex>
                  <v-flex class="xs11" md="4">
                    <v-text-field label="Name" :value="shopData.name" />
                  </v-flex>
                  <v-flex class="xs6" md="4">
                    <v-text-field label="Email" :value="shopData.email" />
                  </v-flex>
                  <v-flex class="xs6" md="4">
                    <v-text-field
                      label="Mobile"
                      type="number"
                      :value="shopData.mobile"
                    />
                  </v-flex>
                  <v-flex class="xs6" md="4">
                    <v-text-field
                      label="Latitude"
                      type="number"
                      :value="shopData.latitude"
                    />
                  </v-flex>
                  <v-flex class="xs6" md="4">
                    <v-text-field
                      label="Longtitude"
                      type="number"
                      :value="shopData.longtitude"
                    />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-file-input
                      label="Main Image"
                      accept="image/png, image/jpeg"
                      prepend-icon="mdi-camera"
                    />
                  </v-flex>
                  <v-flex class="xs12"><v-btn>Update</v-btn></v-flex>
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
  async fetch({ store, params }) {
    await store.dispatch('fetchAdminShopData')
  },
  computed: {
    shopData() {
      return this.$store.getters.adminShopData[this.$route.params.id - 1]
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
