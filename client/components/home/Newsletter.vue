<template>
  <v-col cols="12">
    <div>
      <section
        id="subscribe"
        class="d-flex align-center mx-n3 v-sheet v-sheet--tile theme--dark grey darken-4"
      >
        <v-container>
          <v-row
            :class="{
              'px-3': $vuetify.breakpoint.smAndDown,
            }"
          >
            <v-col cols="12" md="6">
              <h2 class="display-1 font-weight-bold mb-3">
                Subscribe to our Newsletter
              </h2>
              <div>Stay up to date with our latest news and products</div>
            </v-col>
            <v-col cols="12" md="3" class="ml-auto">
              <v-form
                method="post"
                name="revue-form"
                novalidate="novalidate"
                action="/profile/vuetify/add_subscriber"
              >
                <v-text-field
                  label="Your Email Address"
                  required
                  dark
                  append-outer-icon="mdi-arrow-right-drop-circle-outline"
                />
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>
  </v-col>
</template>

<script>
export default {}
</script>

<style></style>
