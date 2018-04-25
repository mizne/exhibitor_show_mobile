// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import MintUI from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import YDUI from 'vue-ydui'

// axios.defaults.baseURL = 'http://192.168.1.7:9090';
Vue.prototype.$http = axios

// 第三方
import '../static/swiper.min.css'
// scss
import './assets/scss/index.scss'
import './assets/iconfont/iconfont.css'
import 'vue-ydui/dist/ydui.px.css'

Vue.use(MintUI)
Vue.use(YDUI)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
