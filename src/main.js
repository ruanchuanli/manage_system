import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.less'
import ZkTable from 'vue-table-with-tree-grid'
import * as filters from '@/filters'
import './icons'
import '@/permission'
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})
Vue.use(ZkTable)
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
