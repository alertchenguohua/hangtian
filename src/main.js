import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./components/tab.css"
import 'normalize.css/normalize.css';
import md5 from 'js-md5'

import api from './api';
Vue.use(api);

Vue.config.productionTip = false
Vue.prototype.$md5 = md5
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
