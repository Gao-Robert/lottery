// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

import 'whatwg-fetch' // 兼容安卓4.4

Vue.config.productionTip = false
Vue.config.performance = true

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
  // el: '#app',
  // render(h) {
  //   return h(App, {
  //     props: {
  //       myprop: this.$el.attributes.myprop.value
  //     }
  //   })
  // }
})
