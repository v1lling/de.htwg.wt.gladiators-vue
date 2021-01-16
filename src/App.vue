<template>
<v-app>
  <div id = "app">
    <MyToolbar/>
    <v-alert :value="alert.show"
      dismissible
      dense
      dark
      :type="alert.type"
      border="top"
      transition="fade">
      {{ alert.message }}
    </v-alert>
    <router-view class="v-router"/>
    <MyFooter/>
  </div>

</v-app>
</template>

<script>
  import MyFooter from '@/components/my-footer.vue';
  import MyToolbar from '@/components/my-toolbar.vue';

  export default {
    components: {MyToolbar, MyFooter},
    data: function() {
      return {
        window: {
            width: 0,
            height: 0
        }
      }
    },
    computed : {
      alert() {
        return this.$store.state.alert
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
    },
    mounted() {
      this.$store.dispatch("signedIn", true);
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
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-image: url("/img/background3.jpg");
    background-size: cover;
  }
  .v-alert {
    position:absolute;
    z-index: 99;
    top: 8px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
  }
</style>
