// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VCharts from 'vue-echarts'
import Vcomp from './plugins/dataBox.js'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './utils/filter_utils.js'
import VueWebsocket from 'vue-native-websocket'
import echarts from 'echarts';
import 'echarts-gl'
import store from '@/store/store'
import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
} from './store/mutation-types'

const mutations = {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
}

/* eslint-disable no-new */
// Vue.use(vuex)
Vue.use(ElementUI)
Vue.use(Vcomp)
Vue.use(VCharts)
Vue.use(VueWebsocket,'ws://localhost:9999/webSocketServer/admin',{
  connectManually: true,
  store:store,
  mutations: mutations,
  format: 'json'
})
Vue.config.productionTip = true
Vue.prototype.$echarts = echarts;
window.bus = new Vue();
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
