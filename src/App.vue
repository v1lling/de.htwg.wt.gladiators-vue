<template>
  <div id = "app">
    <v-toolbar >
      <v-app-bar-nav-icon v-if="window.width<400" @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-img
        src="@/assets/logo.png"
        max-height="40"
        max-width="40"
        contain>
      </v-img>
      <v-toolbar-title class="v-title">Gladiators</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="window.width>=400" class="hidden-sm-and-down">
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
        <v-btn text to="/">Game</v-btn>
        <v-btn text to="/About">About</v-btn>

    </v-navigation-drawer>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        window: {
            width: 0,
            height: 0
        },
        drawer: null
      }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }
    }
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
.v-title {
  padding-left: 1rem;
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
