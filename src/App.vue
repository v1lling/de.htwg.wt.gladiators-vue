<template>
<v-app>
  <div id = "app">
    <MyToolbar/>
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
