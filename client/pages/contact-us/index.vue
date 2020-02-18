<template>
  <v-container id="contact-us" fluid class="pa-0">
    <v-sheet class="grey mt-n12 lighten-2" light tile>
      <iframe
        :src="this.$store.getters.shopData.embedded_map_url"
        class="mt-12"
        frameborder="0"
        height="450"
        style="border: 0;"
        width="100%"
      />
    </v-sheet>
    <v-container class="pt-12">
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="font-weight-bold mb-6 display-2">Contact Info</h2>
          <v-responsive
            class="title grey--text text--darken-1 font-weight-light font-italic mb-12"
            style="max-width: 350px;"
          >
            Please feel free to reach out to us with your questions and
            comments.
          </v-responsive>
          <div
            v-if="this.$store.getters.shopData.email"
            class="display-1 font-weight-medium mb-2"
          >
            Email
          </div>
          <a
            v-if="this.$store.getters.shopData.email"
            :href="'mailto:' + this.$store.getters.shopData.email"
            class="body-2 d-inline-block mb-12"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ this.$store.getters.shopData.email }}
          </a>
          <div
            v-if="this.$store.getters.shopData.google"
            class="display-1 font-weight-medium mb-2"
          >
            Google
          </div>
          <a
            v-if="this.$store.getters.shopData.google"
            :href="'//' + this.$store.getters.shopData.google"
            target="_blank"
            rel="noopener noreferrer"
            class="body-2 d-inline-block mb-12"
          >
            Google Page
          </a>
          <div
            v-if="this.$store.getters.shopData.facebook"
            class="display-1 font-weight-medium mb-2"
          >
            Facebook
          </div>
          <a
            v-if="this.$store.getters.shopData.facebook"
            :href="'//' + this.$store.getters.shopData.facebook"
            target="_blank"
            rel="noopener"
            class="body-2 d-inline-block mb-12"
          >
            Facebook Page
          </a>
          <div
            v-if="this.$store.getters.shopData.youtube"
            class="display-1 font-weight-medium mb-2"
          >
            Youtube
          </div>
          <a
            v-if="this.$store.getters.shopData.youtube"
            :href="'//' + this.$store.getters.shopData.youtube"
            target="_blank"
            rel="noopener"
            class="body-2"
          >
            Youtube Channel
          </a>
        </v-col>
        <v-col cols="12" md="7">
          <v-container id="write-to-us">
            <v-row>
              <v-col class="d-flex child-flex" cols="12">
                <v-sheet class="d-flex align-center transparent" light>
                  <v-responsive class="mx-auto py-2" style="max-width: 600px;">
                    <h2 class="font-weight-bold mb-6 text-center display-2">
                      Write to Us
                    </h2>
                    <v-text-field v-model="subject" label="Subject" />
                    <v-textarea
                      v-model="message"
                      label="Leave a Message"
                      rows="5"
                    />
                    <v-btn
                      :href="
                        'mailto:' +
                          this.$store.getters.shopData.email +
                          '?subject=' +
                          subject +
                          ';body=' +
                          message
                      "
                      target="_blank"
                      class="v-size--x-large text-none accent"
                      rel="noopener noreferrer"
                      >Send Message</v-btn
                    >
                  </v-responsive>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    subject: '',
    message: ''
  }),
  head() {
    return {
      title: 'Contact Us',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Contact us'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
