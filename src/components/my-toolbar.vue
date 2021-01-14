<template>
   <div>
      <v-toolbar dark>
        <v-img
          src="/img/logo.png"
          max-height="40"
          max-width="40"
          contain>
        </v-img>
        <v-toolbar-title class="v-title">Gladiators</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text to="/">Rules</v-btn>
          <v-btn text v-if=this.$store.getters.isLoggedIn to="/Game">Game</v-btn>
          <v-btn text v-if=!this.$store.getters.isLoggedIn to="/Login">Login</v-btn>
          <v-btn text v-if=this.$store.getters.isLoggedIn @click="logout()">Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      
      <v-navigation-drawer
          v-model="drawer"
          temporary
          right
          absolute
          width = "200"
          id = "drawer">
          <v-list
            nav
            dense>
            <v-list-item-group
              active-class="deep-purple--text text--accent-4">
              <v-list-item to="/">
                <v-list-item-title >Game</v-list-item-title>
              </v-list-item>
              <v-list-item to="/About">
                <v-list-item-title >Rules</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
      </v-navigation-drawer>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default Vue.component('my-toolbar', {
      data() {
        return {
          drawer: null
        }
      },
      methods: {
        logout: function() {
            this.$store.dispatch("logout");
        }
      }
    });
</script>
<style scoped>
.v-title {
  padding-left: 1rem;
  font-size: 2.25rem !important;
  font-family: "Moonflower";
}
.v-image {
    border: 3px solid white;
    border-radius: 32px;
}
</style>
