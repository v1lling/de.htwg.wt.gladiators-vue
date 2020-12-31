<template>
  <div id = "app">
    <v-toolbar >
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
            v-model="group"
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
    <router-view class="v-router"/>
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
body {
  background: #2980B9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
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
