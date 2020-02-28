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
import echarts from 'echarts';
import 'echarts-gl'

/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(Vcomp)
Vue.use(VCharts)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
window.bus = new Vue();
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
