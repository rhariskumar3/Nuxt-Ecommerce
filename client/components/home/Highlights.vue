<template>
  <v-col cols="12">
    <div>
      <v-container id="highlights" fluid class="py-0 mt-n8">
        <v-container class="px-0">
          <v-card>
            <v-row class="no-gutters">
              <v-col cols="12" md="4">
                <div class="d-flex align-center px-6 py-6">
                  <v-img
                    src="https://store.vuetifyjs.com/img/shipping.5a791779.png"
                    style="height: 50px; max-width: 50px;"
                    contain
                  />
                  <div class="ml-8">
                    <div class="body-2 text-uppercase mb-2">
                      Free Shipping
                    </div>
                    <div class="body-1 font-weight-bold mb-3">
                      Every Day, Every Item
                    </div>
                    <div class="caption grey--text">
                      *On orders over $85
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex align-center px-6 py-6">
                  <v-img
                    src="https://store.vuetifyjs.com/img/support.f353d1a9.png"
                    style="height: 50px; max-width: 50px;"
                    contain
                  />
                  <div class="ml-8">
                    <div class="body-2 text-uppercase mb-2">
                      Dedicated Support
                    </div>
                    <div class="body-1 font-weight-bold mb-3">
                      Live chat on Discord
                    </div>
                    <div class="caption grey--text">
                      *Talk with a Developer
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="d-flex align-center px-6 py-6">
                  <v-img
                    src="data:image/png;base64,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"
                    style="height: 50px; max-width: 50px;"
                    contain
                  />
                  <div class="ml-8">
                    <div class="body-2 text-uppercase mb-2">
                      Secure
                    </div>
                    <div class="body-1 font-weight-bold mb-3">
                      Payments through Shopify
                    </div>
                    <div class="caption grey--text">
                      *Paypal option available
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-container>
    </div>
  </v-col>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#highlights .v-card .row > :not(:first-child) {
  border-left: 2px solid #eaeaea;
}

@media screen and (max-width: 960px) {
  #highlights .v-card .row > :not(:first-child) {
    border-left: none;
    border-top: 2px solid #eaeaea;
  }
}
</style>
