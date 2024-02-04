import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import Register from '@/views/register'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    redirect: '/layout/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/layout/children/home')
      },
      {
        path: 'category',
        component: () => import('@/views/layout/children/category')
      },
      {
        path: 'search',
        component: () => import('@/views/layout/children/search')
      },
      {
        path: 'message',
        component: () => import('@/views/layout/children/message')
      },
      {
        path: 'user',
        component: () => import('@/views/layout/children/user')
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})
/* const authUrls = ['/']
router.beforeEach((to, from, next) => {
}) */
export default router
