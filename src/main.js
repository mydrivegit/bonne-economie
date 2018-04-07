// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
//  Installation of Bootstrap 4
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import jQuery from 'jquery'
import 'font-awesome/css/font-awesome.css'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
global.jQuery = jQuery

Vue.config.productionTip = false
Vue.prototype.moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
