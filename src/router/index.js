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
    redirect: 'home/users',
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/user/userlist'),
        meta: {
          // activeMenu: 'users',
          title: '用户管理 <i class="el-icon-arrow-right" style="color:#C0C4CC"></i> 用户列表'
        }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/role/rolelist'),
        meta: {
          title: '权限管理 <i class="el-icon-arrow-right" style="color:#C0C4CC"></i> 角色列表'
        }
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('@/views/role/permlist'),
        meta: {
          title: '权限管理 <i class="el-icon-arrow-right" style="color:#C0C4CC"></i> 权限列表'
        }
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goods/goodslist'),
        meta: {
          title: '商品管理 <i class="el-icon-arrow-right" style="color:#C0C4CC"></i> 商品列表'
        }
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
        path: 'params',
        name: 'params',
        component: () => import('@/views/goods/sortinfo'),
        meta: {
          title: '商品管理 <i class="el-icon-arrow-right" style="color:#C0C4CC"></i> 参数列表'
        }
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/goods/goodsort'),
        meta: {
          title: '商品管理 <i class="el-icon-arrow-right" style="color:#C0C4CC"></i> 分类列表'
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/orders/orderslist'),
        meta: {
          title: '订单管理 <i class="el-icon-arrow-right" style="color:#C0C4CC"></i> 订单列表'
        }
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('@/views/shuju/shujulist'),
        meta: {
          title: '数据管理 <i class="el-icon-arrow-right" style="color:#C0C4CC"></i> 数据图表'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
