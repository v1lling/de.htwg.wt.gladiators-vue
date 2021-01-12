<template>
<v-app>
  <div id = "app">
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
    <router-view class="v-router"/>
    <v-footer class="pl-4" app width="auto" dark padless height="50">
      Sascha Villing & Sebastian Voigt
      <v-spacer></v-spacer>
      <v-layout justify-end>
        <v-btn class="mx-4" dark href='https://github.com/v1lling/de.htwg.wt.gladiators-vue' target="_blank">
          <v-icon class="pr-2" size="24px">
            mdi-github
          </v-icon>
           Front-End
        </v-btn>
        <v-btn class="mx-4" dark href='https://github.com/v1lling/de.htwg.wt.gladiators' target="_blank">
          <v-icon class="pr-2" size="24px">
            mdi-github
          </v-icon>
          Back-End
        </v-btn>
      </v-layout>
    </v-footer>
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
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
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
      },
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: "Moonflower";
    src: url("/fonts/MoonFlowerBold.ttf");
  }
  html {
    height: 100%;
  }
  body {
    min-height: 100%;
  }
  .v-application {
    font-family: sans-serif;
  }
  #app {
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-image: url("/img/background3.jpg");
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
  .v-footer {
    overflow: hidden;
  }
</style>
