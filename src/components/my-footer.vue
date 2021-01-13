<template>
    <v-footer v-if="!isMobile()" class="pl-4" app width="auto" dark padless height="50">
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
</template>
<script>
    import { mixinDetectingMobile } from '@/mixins/mixinDetectingMobile';
    import Vue from 'vue';
    export default Vue.component('my-footer', {
        mixins: [mixinDetectingMobile]
    });
</script>
<style scoped>
.v-footer {
  overflow: hidden;
}
</style>