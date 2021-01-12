import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Axios from 'axios'
import vmodal from 'vue-js-modal';
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
//Vue.use(Vuetify);
Vue.use(vmodal);
Vue.prototype.$http = Axios;
new Vue({
  vuetify,
  store: store,
  router,
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app')
