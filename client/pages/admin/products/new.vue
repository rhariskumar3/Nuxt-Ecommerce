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
                    <v-text-field label="Name" />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea label="Summary" />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea label="Description" />
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
                    <v-text-field label="Quantity" type="number" />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-text-field label="Minimum Quantity" type="number" />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-text-field label="Price" type="number" />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-select label="Tax" />
                  </v-flex>
                  <v-flex class="xs4" md="4">
                    <v-text-field label="Shipping Price" type="number" />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field label="Length" type="number" />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field label="Breadth" type="number" />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field label="Height" type="number" />
                  </v-flex>
                  <v-flex class="xs3" md="4">
                    <v-text-field label="Weight" type="number" />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-text-field label="Meta Title" />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-textarea label="Meta Description" />
                  </v-flex>
                  <v-flex class="xs12" md="4">
                    <v-text-field disabled label="Friendly URL" />
                  </v-flex>
                  <v-flex class="xs12"><v-btn>Create</v-btn></v-flex>
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
