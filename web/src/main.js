import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(BootstrapVue)
Vue.use(VueResource)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'toastr/build/toastr.min.css'

new Vue({
  el: '#app',
  render: h => h(App)
})
