<template>
  <div id="core-view">
    <v-container class="fill-height grid-list-xl" fluid>
      <div class="layout justify-center wrap">
        <div class="flex md-12">
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
                        Tax
                      </h4></span
                    >
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                      dense
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row align-center justify="end" class="mx-4"
                      ><v-btn absolute class="secondary" to="/admin/tax/new"
                        >New</v-btn
                      ></v-row
                    >
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <v-card-text>
              <div>
                <v-data-table
                  :headers="headers"
                  :items="taxes"
                  :items-per-page="10"
                  :search="search"
                >
                  <template v-slot:item.enabled="{ item }">
                    <v-icon
                      v-if="item.enabled"
                      color="success"
                      @click="updateState(item.id, item.enabled)"
                      >mdi-check</v-icon
                    >
                    <v-icon
                      v-else
                      color="error"
                      @click="updateState(item.id, item.enabled)"
                      >mdi-close</v-icon
                    >
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon @click="item">mdi-pencil</v-icon>
                    <v-icon @click="item">mdi-delete-forever</v-icon>
                  </template>
                </v-data-table>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async fetch({ store, params }) {
    await store.dispatch('fetchAdminTax')
  },
  data: () => ({
    search: '',
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Rate', value: 'rate' },
      { text: 'Enabled', value: 'enabled' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  computed: {
    taxes() {
      return this.$store.getters.adminTax
    },
  },
  methods: {
    async updateState(id, state) {
      try {
        await this.$axios
          .put('admin/tax/' + id + '/state', { enabled: !state })
          .then((result) => {
            if (result.success) this.$notifier.success('updated')
            else this.$notifier.error('try again')
          })
          .catch((err) => {
            this.$notifier.error(err)
          })
        await this.$store.dispatch('fetchAdminTax')
      } catch (error) {}
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
