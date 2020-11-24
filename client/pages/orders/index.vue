<template>
  <v-container fluid class="aligin-center justify-center">
    <v-data-table :headers="headers" :items="orders" :items-per-page="10">
      <template v-slot:top>
        <div class="v-offset">
          <v-card
            dark
            class="v-card--material__header elevation-2 green elevation-10"
          >
            <v-row style="margin-left: auto; padding-bottom: 4px;">
              <v-col cols="12" md="6">
                <span
                  ><h4 class="title font-weight-light">
                    Orders
                  </h4></span
                >
              </v-col>
            </v-row>
          </v-card>
        </div>
      </template>
      <template v-slot:item.user="{ item }">{{ item.user.name }} </template>
      <template v-slot:item.totalPaid="{ item }"
        >₹{{ item.totalPaid }}
      </template>
      <template v-slot:item.orderState="{ item }"
        >{{ item.orderState.name }}
      </template>
      <template v-slot:item.createdAt="{ item }"
        >{{ new Date(item.createdAt).toLocaleString() }}
      </template>
      <template v-slot:item.invoiceNumber="{ item }">
        <p v-if="item.invoiceNumber > 0" class="text-start">
          {{ item.invoiceNumber }}
        </p>
        <p v-else class="text-start">-</p>
      </template>
      <template v-slot:item.details="{ item }">
        <NuxtLink style="cursor: pointer;" :to="'/orders/' + item.reference">
          Details
        </NuxtLink>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth-guard',
  asyncData({ app: { $axios, $auth }, params, error }) {
    return $axios
      .get(`/order/` + $auth.user.id)
      .then((res) => {
        return { orders: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Orders not found' })
      })
  },
  data: () => ({
    headers: [
      { text: 'Order reference', value: 'reference' },
      { text: 'Date', value: 'createdAt' },
      { text: 'Total price', value: 'totalPaid' },
      { text: 'Payment', value: 'payment' },
      { text: 'Status', value: 'orderState' },
      { text: 'Invoice', value: 'invoiceNumber' },
      { text: 'Details', value: 'details' },
    ],
  }),
  head() {
    return {
      title: 'Orders',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My Orders',
        },
      ],
    }
  },
}
</script>

<style></style>
