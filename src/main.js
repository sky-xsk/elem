import 'element-ui/lib/theme-default/index.css'

import App from './App'
import ElementUI from 'element-ui'
import Router from 'vue-router'
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'

/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     template: '<App/>',
//     components: { App }
// })
Vue.use(VueResource)
Vue.use(ElementUI)

const app = new Vue({
    router,
    ...App
})

app.$mount('#app')
export { app }