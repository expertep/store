import Vue from 'vue'
import Router from 'vue-router'
import shop from '@/components/shop'
import add from '@/components/add'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      component: shop
    },
    {
      path: '/add',
      name: 'add',
      component: add
    }
  ]
})
