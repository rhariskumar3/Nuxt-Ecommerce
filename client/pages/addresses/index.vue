<template>
  <v-container fluid class="aligin-center justify-center">
    <v-data-iterator :items="addresses" hide-default-footer>
      <template v-slot:header>
        <div class="v-offset">
          <v-card
            dark
            class="v-card--material__header elevation-2 green elevation-10"
          >
            <v-row style="margin-left: auto; padding-bottom: 4px;">
              <v-col cols="12" md="6">
                <span
                  ><h4 class="title font-weight-light">
                    Addresses
                  </h4></span
                >
              </v-col>
              <v-col cols="12" md="6">
                <v-row align-center justify="end" class="mx-4"
                  ><v-btn absolute class="secondary" to="/addresses/new"
                    >New</v-btn
                  ></v-row
                >
              </v-col>
            </v-row>
          </v-card>
        </div>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{
                item.name
              }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-if="item.address1">
                  <v-list-item-content>{{ item.address1 }}</v-list-item-content>
                </v-list-item>

                <v-list-item v-if="item.address2">
                  <v-list-item-content>{{ item.address2 }}</v-list-item-content>
                </v-list-item>

                <v-list-item v-if="item.cityId">
                  <v-list-item-content>{{
                    item.city.name
                  }}</v-list-item-content>
                </v-list-item>

                <v-list-item
                  v-if="item.stateId && item.countryId && item.pinCode"
                >
                  <v-list-item-content
                    >{{ item.state.name }}, {{ item.country.name }} -
                    {{ item.pinCode }}</v-list-item-content
                  >
                </v-list-item>

                <v-list-item v-if="item.mobile">
                  <v-list-item-content
                    >Mobile: {{ item.mobile }}</v-list-item-content
                  >
                </v-list-item>

                <v-list-item v-if="item.company">
                  <v-list-item-content
                    >Company: {{ item.company }}</v-list-item-content
                  >
                </v-list-item>

                <v-list-item v-if="item.gstNo">
                  <v-list-item-content
                    >GST No: {{ item.gstNo }}</v-list-item-content
                  >
                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-spacer />
                <v-btn text>Remove</v-btn>
                <v-btn outlined class="end" :to="'/addresses/' + item.id"
                  >Edit</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth-guard',
  asyncData({ app: { $axios, $auth }, params, error }) {
    return $axios
      .get(`/address/` + $auth.user.id)
      .then((res) => {
        return { addresses: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Addresses not found' })
      })
  },
  head() {
    return {
      title: 'Addresses',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Saved Addresses',
        },
      ],
    }
  },
}
</script>

<style></style>
