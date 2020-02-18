<template>
  <v-card flat class="transparent" style="transform-origin: center top 0px;">
    <v-img id="banner" :src="detail.image" class="white--text text-center">
      <v-overlay
        class="text-center text-capitalize"
        opacity="0.8"
        absolute
        dark
      >
        <h2
          class="mb-3 font-italic font-weight-black"
          :class="{
            'displat-1': $vuetify.breakpoint.smAndDown,
            'displat-4': $vuetify.breakpoint.mdAndUp
          }"
        >
          {{ detail.title }}
        </h2>
      </v-overlay>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: ['detail']
}
</script>

<style lang="scss" scoped>
#banner {
  min-height: 20vh;
  max-height: 300px;
}

@media only screen and (max-width: 768px) {
  #banner {
    min-height: 5vh;
    max-height: 150px;
  }
}
</style>
