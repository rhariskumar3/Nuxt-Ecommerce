<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex v-for="(card, i) in cards" :key="i" sm6 xs12 md6 lg3>
        <v-card>
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text>
            <v-icon :color="card.color" class="pr-2">{{ card.icon }}</v-icon
            >{{ card.value }}
          </v-card-text>
          <v-card-actions>
            <v-icon small class="pr-2">{{ card.secondaryIcon }}</v-icon
            >{{ card.secondary }}
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    cards: [
      {
        title: 'Revenue',
        color: 'primary',
        icon: 'mdi-store',
        value: '$34,245',
        secondary: 'Last 24 Hours',
        secondaryIcon: 'mdi-calendar'
      },
      {
        title: 'Used Space',
        color: 'primary',
        icon: 'mdi-content-copy',
        value: '49/50GB',
        secondary: 'Get More Space...',
        secondaryIcon: 'mdi-alert'
      },
      {
        title: 'Fixed Issues',
        color: 'primary',
        icon: 'mdi-information-outline',
        value: '75',
        secondary: 'Tracked from Github',
        secondaryIcon: 'mdi-tag'
      },
      {
        title: 'Followers',
        color: 'primary',
        icon: 'mdi-twitter',
        value: '+245',
        secondary: 'Just Updated',
        secondaryIcon: 'mdi-update'
      }
    ]
  })
}
</script>

<style scoped></style>
