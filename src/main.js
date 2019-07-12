import Vue from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/js/fontawesome.min.js'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
