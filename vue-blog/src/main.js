import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/element'
import '@/plugins/http'
import '@/plugins/vuescroll'

import '@/assets/css/global.styl'
import 'element-ui/lib/theme-chalk/display.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import _ from 'lodash'

Vue.config.productionTip = false
const EventBus = new Vue()
Vue.prototype.$EventBus = EventBus
Vue.config.productionTip = false
Vue.prototype._ = _
window.alert = function (value) {
  Vue.prototype.$notify.error({
    title: '错误',
    message: value
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
