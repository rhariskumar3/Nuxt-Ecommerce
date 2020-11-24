<template>
  <v-container id="order" fluid>
    <div>
      <v-btn absolute class="secondary no-print" @click="printDiv">Print</v-btn>
    </div>
    <div id="invoiceBox" class="invoice-box">
      <div class="clearfix header1">
        <div id="logo">
          <img
            :src="this.$store.getters.shopData.logo"
            style="max-width: 300px; max-height: 100px;"
          />
        </div>
        <div id="company">
          <h2 class="name">{{ this.$store.getters.shopData.name }}</h2>
          <div>
            {{ this.$store.getters.shopData.address1 }},{{
              this.$store.getters.shopData.address2
            }}
          </div>
          <div>
            {{ this.$store.getters.shopData.city.name }},{{
              this.$store.getters.shopData.state.name
            }}
            - {{ this.$store.getters.shopData.pinCode }}
          </div>
          <div>
            {{ this.$store.getters.shopData.mobile }} /
            <a :href="'mailto:' + this.$store.getters.shopData.email">{{
              this.$store.getters.shopData.email
            }}</a>
          </div>
          <div></div>
        </div>
      </div>
      <div id="details" class="clearfix" style="margin-bottom: 10px;">
        <div id="client">
          <div class="to">Billing Address:</div>
          <h2 class="name">{{ data.invoiceAddress.name }}</h2>
          <div class="address">{{ data.invoiceAddress.address1 }}</div>
          <div class="address">{{ data.invoiceAddress.mobile }}</div>
        </div>
        <div v-if="data.invoiceDate" id="invoice">
          <h1>INVOICE {{ data.invoiceNumber }}</h1>
          <div class="date">Date of Invoice: {{ data.invoiceDate }}</div>
        </div>
      </div>
      <div id="details" class="clearfix">
        <div id="client">
          <div class="to">Shipping Address:</div>
          <h2 class="name">{{ data.deliveryAddress.name }}</h2>
          <div class="address">{{ data.deliveryAddress.address1 }}</div>
          <div class="address">{{ data.deliveryAddress.mobile }}</div>
        </div>
        <div id="invoice">
          <div class="date">Order State: {{ data.orderState.name }}</div>
          <div class="date">Payment Mode: {{ data.payment }}</div>
          <div class="date">{{ data.reference }}</div>
        </div>
      </div>
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="no">#</th>
            <th class="desc">Product</th>
            <th class="unit">Tax Rate</th>
            <th class="unit">Unit Price (Tax incl.)</th>
            <th class="qty">Qty</th>
            <th class="total">Total (Tax incl.)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <td class="no">{{ index + 1 }}</td>
            <td class="desc">{{ product.productName }}</td>
            <td class="unit">₹{{ product.taxRate }}%</td>
            <td class="unit">₹{{ product.productPrice }}</td>
            <td class="qty">{{ product.productQuantity }}</td>
            <td class="total">₹{{ product.totalPrice }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td colspan="2">Discount</td>
            <td>₹{{ data.totalDiscounts }}</td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td colspan="2">Total Tax</td>
            <td>₹{{ data.totalTax }}</td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td colspan="2">Shipping Costs</td>
            <td>₹{{ data.totalShipping }}</td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td colspan="2">Total</td>
            <td>₹{{ data.totalPaid }}</td>
          </tr>
        </tfoot>
      </table>
      <div id="thanks">Thank you!</div>
      <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">
          A finance charge of 1.5% will be made on unpaid balances after 30
          days.
        </div>
      </div>
      <div class="clearfix footer1">
        Invoice was created on a computer and is valid without the signature and
        seal.
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth-guard',
  asyncData({ app: { $axios, $auth }, params, error }) {
    return $axios
      .get(`/order/` + params.id + `/detail`)
      .then((res) => {
        return { data: res.data.data, products: res.data.products }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Order not found' })
      })
  },
  methods: {
    printDiv() {
      window.print()
    },
  },
  head() {
    return {
      title: 'Order ' + this.data.id || this.$route.params.id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'content',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.clearfix:after {
  content: '';
  display: table;
  clear: both;
}

a {
  color: #0087c3;
  text-decoration: none;
}

.header1 {
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #aaaaaa;
}

#logo {
  float: left;
  margin-top: 8px;
}

#logo img {
  height: 70px;
}

#company {
  float: right;
  text-align: right;
}

#details {
  margin-bottom: 50px;
}

#client {
  padding-left: 6px;
  border-left: 6px solid #0087c3;
  float: left;
}

#client .to {
  color: #777777;
}

h2.name {
  font-size: 1.4em;
  font-weight: normal;
  margin: 0;
}

#invoice {
  float: right;
  text-align: right;
}

#invoice h1 {
  color: #0087c3;
  font-size: 2.4em;
  line-height: 1em;
  font-weight: normal;
  margin: 0 0 10px 0;
}

#invoice .date {
  font-size: 1.1em;
  color: #777777;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
}

table th,
table td {
  padding: 20px;
  background: #eeeeee;
  text-align: center;
  border-bottom: 1px solid #ffffff;
}

table th {
  white-space: nowrap;
  font-weight: normal;
}

table td.unit,
table td.qty,
table td.total {
  font-size: 1.2em;
}

table tbody tr:last-child td {
  border: none;
}

table tfoot td {
  border-bottom: none;
}

table tfoot tr:first-child td {
  border-top: 1px solid #aaaaaa;
}

table tfoot tr:last-child td {
  color: #57b223;
  font-size: 1.4em;
  border-top: 1px solid #57b223;
}

table tfoot tr td:first-child {
  border: none;
}

#thanks {
  font-size: 2em;
  margin-bottom: 50px;
}

#notices {
  padding-left: 6px;
  border-left: 6px solid #0087c3;
}

.footer1 {
  color: #777777;
  height: 30px;
  border-top: 1px solid #aaaaaa;
  padding: 8px 0;
  text-align: center;
  font-size: small;
  margin-top: 16px;
}

@media print {
  header *,
  footer *,
  body * {
    visibility: hidden;
  }

  #invoiceBox,
  #invoiceBox * {
    visibility: visible;
  }

  #invoiceBox {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
