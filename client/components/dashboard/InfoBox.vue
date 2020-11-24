<template>
  <v-layout row wrap>
    <v-flex v-for="(stat, index) in monthlyStats" :key="index" md3 sm6 xs12>
      <v-card :class="stat.bgColor" dark elevation="4">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon :class="[stat.iconClass]" v-text="stat.icon"></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle v-text="stat.title"></v-list-item-subtitle>
            <br />
            <v-list-item-title v-text="stat.data"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
export default {
  data: () => ({
    monthlyStats: [
      {
        bgColor: 'cyan darken-3',
        iconClass: 'amber white--text',
        icon: 'mdi-wallet-membership',
        title: 'New Order',
        data: '120',
        action: {
          label: 'more',
          link: '',
        },
      },
      {
        bgColor: 'deep-orange  lighten-3',
        iconClass: 'cyan white--text',
        icon: 'mdi-wallet-giftcard',
        title: 'User Registrationsr',
        data: '780',
        action: {
          label: 'more',
          link: '',
        },
      },
      {
        bgColor: 'blue-grey lighten-4',
        iconClass: 'orange darken-5 white--text',
        icon: 'mdi-wallet-travel',
        title: 'Unique Visitors',
        data: '78',
        action: {
          label: 'more',
          link: '',
        },
      },
      {
        bgColor: 'pink  darken-1',
        iconClass: 'blue lighten-3 white--text',
        icon: 'mdi-wall',
        title: 'Bounce Rate',
        data: '53%',
        action: {
          label: 'more',
          link: '',
        },
      },
    ],
  }),
}
</script>
