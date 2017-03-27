import Router from 'vue-router'
import Vue from 'vue'
import goods from '../components/goods'
import ratings from '../components/ratings'
import seller from '../components/seller'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            name: '/',
            path: '/',
            redirect: 'goods' //路由配置修改处，这样修改的原因是，当切换到默认的good组件下，高亮还是在的，重定向
        },
        {
            name: 'goods',
            path: '/goods',
            component: goods
        },
        {
            name: 'ratings',
            path: '/ratings',
            component: ratings
        },
        {
            name: 'seller',
            path: '/seller',
            component: seller
        }
    ]
});