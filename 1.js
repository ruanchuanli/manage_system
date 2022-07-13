import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    redirect: 'home/userlist',
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/user/userlist')
      },
      {
        path: 'rolelist',
        name: 'rolelist',
        component: () => import('@/views/role/rolelist')
      },
      {
        path: 'permlist',
        name: 'permlist',
        component: () => import('@/views/role/permlist')
      },
      {
        path: 'goodslist',
        name: 'goodslist',
        component: () => import('@/views/goods/goodslist')
        // children: [
        //   {
        //     path: 'addgood',
        //     name: 'addgood',
        //     component: () => import('@/views/goods/addgood')
        //   }
        // ]
      },
      {
        path: 'addgood',
        name: 'addgood',
        component: () => import('@/views/goods/addgood')
      },
      {
        path: 'sortinfo',
        name: 'sortinfo',
        component: () => import('@/views/goods/sortinfo')
      },
      {
        path: 'goodsort',
        name: 'goodsort',
        component: () => import('@/views/goods/goodsort')
      },
      {
        path: 'orderslist',
        name: 'orderslist',
        component: () => import('@/views/orders/orderslist')
      },
      {
        path: 'shujulist',
        name: 'shujulist',
        component: () => import('@/views/shuju/shujulist')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
