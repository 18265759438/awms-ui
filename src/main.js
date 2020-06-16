// import 'babel-polyfill'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import EasyUI from 'vx-easyui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(EasyUI)

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

axios
  .get('./config.json')
  .then(result => {
    Vue.prototype.baseConfig = result.data
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
  .catch(error => {
    error
    //console.log('get baseConfig error...' + error)
  })
