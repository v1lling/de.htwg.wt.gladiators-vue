<template>
<v-app>
  <div id = "app">
    <v-toolbar dark>
      <v-img
        src="@/assets/logo.png"
        max-height="40"
        max-width="40"
        contain>
      </v-img>
      <v-toolbar-title class="v-title">Gladiators</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon v-if="window.width<400" @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-items v-if="window.width>=400" class="hidden-sm-and-down">
        <v-btn text to="/">Game</v-btn>
        <v-btn text to="/About">Rules</v-btn>
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
    <transition name="fade">
      <router-view class="v-router"/>
    </transition>
  </div>
</v-app>
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

<style lang="scss" scoped>
  @font-face {
    font-family: "Moonflower";
    src: url("~@/assets/fonts/MoonFlowerBold.ttf");
  }
  html {
    height: 100%;
  }
  body {
    min-height: 100%;
  }
  #app {
    height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-image: url("~@/assets/background.jpg");
    background-size: cover;
  }
  .v-title {
    padding-left: 1rem;
    font-size: 2.25rem !important;
    font-family: "Moonflower";
  }
  .v-image {
      border: 3px solid white;
      border-radius: 32px;
  }
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .5s;
  }

  .fade-enter-active {
    transition-delay: .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
