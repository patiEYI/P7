import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import './assets/app.scss'

import  'bootstrap/dist/css/bootstrap.css' 
import  'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.headers.common["Authorization"] =
  "Bearer" + " " + localStorage.getItem("token");

new Vue({
  router,
  store,
  axios,
  VueAxios,
  BootstrapVue,
  IconsPlugin,
  
  render: h => h(App)
}).$mount('#app')
