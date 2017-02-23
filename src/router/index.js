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
            component: goods
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

