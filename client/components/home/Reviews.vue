<template>
  <v-col cols="12">
    <div>
      <v-container id="customer-reviews" fluid class="pt-0">
        <h2
          class="font-weight-bold mb-6 text-center mb-12"
          :class="{
            'displat-2': $vuetify.breakpoint.smAndDown,
            'displat-1': $vuetify.breakpoint.mdAndUp
          }"
        >
          Customer Reviews
        </h2>
        <v-container>
          <v-window continuous show-arrows>
            <v-window-item
              v-for="(review, i) in reviews"
              :key="i"
              style="white-space: normal;"
            >
              <div
                :class="{
                  'mx-7': $vuetify.breakpoint.smAndDown,
                  'mx-12': $vuetify.breakpoint.mdAndUp
                }"
              >
                <v-card class="mx-12 pa-3">
                  <v-card-text class="font-italic">
                    {{ review.description }}
                  </v-card-text>
                </v-card>
                <div class="col col-8 offset-5">
                  <div class="subheading-1 font-weight-medium">
                    {{ review.first_name }} {{ review.last_name }}
                  </div>
                  <!--                  <div class="caption grey&#45;&#45;text">-->
                  <!--                    CTO, Big Spire Networks-->
                  <!--                  </div>-->
                </div>
              </div>
            </v-window-item>
          </v-window>
        </v-container>
      </v-container>
    </div>
  </v-col>
</template>

<script>
export default {
  computed: {
    reviews() {
      return this.$store.getters.reviews
    }
  }
}
</script>

<style></style>
