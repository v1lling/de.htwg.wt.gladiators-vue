<template>
  <div id = "app">
    <v-toolbar >
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>Gladiators</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/">Game</v-btn>
        <v-btn text to="/About">Rules</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-navigation-drawer
        v-model="drawer"
        temporary
        absolute
        width = "200"
        id = "drawer">
        <v-btn text to="/">Link One</v-btn>
        <v-btn text to="/About">Link Two</v-btn>

    </v-navigation-drawer>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        drawer: null }
    },
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.swipe-enter-active,
    .swipe-leave-active {
        transition: opacity 0.7s, transform 0.7s;
    }

    .swipe-enter,
    .swipe-leave-active {
        opacity: 0;
        transform: scale(0);
    }
</style>
