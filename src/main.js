import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import Qs from 'qs'
import global_ from './components/Global'
import common from './assets/js/common.js'

Vue.prototype.$http= axios
Vue.prototype.qs= Qs
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_
Vue.prototype.common = common
Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
