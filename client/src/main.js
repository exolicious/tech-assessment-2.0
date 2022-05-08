import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router'

Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  VueRouter,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
