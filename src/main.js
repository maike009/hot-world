import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/style/common.less'

Vue.config.productionTip = false
Vue.prototype.$ws = null
/* Vue.config.errorHandler = function (err, vm, info) {
  console.log(err, '全局捕获的异常')
  // 在这里处理错误
} */
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
