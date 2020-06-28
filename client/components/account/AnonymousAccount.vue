<template>
  <v-card flat>
    <v-card-title>
      <p id="greeting">
        Welcome!
      </p></v-card-title
    >
    <v-card-text>
      <p>You are logged in as an anonymous user</p>
      <p id="register_please">
        Log in or register to manage your data on other devices. <br />
        <span style="font-size: 12px; color: grey;">
          ( When registering via <b> mail </b>, all your current data will be
          saved. <br />
          When signing in with your Google Account - a new profile is created
          for you )
        </span>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn outlined>Sign up</v-btn>
      <v-btn color="primary">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#greeting {
  font-size: 20px;
  letter-spacing: 1px;
  // background: linear-gradient(to right, $secondary 43%, $secondary 51%);
  // color: $color-primary;
  -webkit-background-clip: text;
  margin-top: 10px;
  &:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    // border-bottom: 2px solid $color-primary;
  }
}
</style>
