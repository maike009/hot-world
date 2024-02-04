import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/style/common.less'

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err, '全局捕获的异常')
  // 在这里处理错误
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
