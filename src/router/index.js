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
  // 聊天相关
  {
    path: '/chat/:friendId',
    name: 'Chat',
    component: () => import('@/views/layout/children/message/chat/ChatView.vue')
  },

  // 聊天2
  /* {
    path: '/chat2',
    component: () => import('@/views/layout/children/message/chat/ChatView.vue')
  }, */
  // post相关
  {
    path: '/addPost',
    name: 'addPost',
    component: () => import('@/views/post/addPost')
  },
  {
    path: '/postDetail',
    name: 'postDetail',
    component: () => import('@/views/post/postDetail')
  },
  // 历史记录
  {
    path: '/history',
    component: () => import('@/views/history')
  },
  // 草稿箱
  {
    path: '/drafts',
    component: () => import('@/views/drafts')
  },
  // 用户相关
  {
    path: '/editUser',
    component: () => import('@/views/layout/children/user/edit')
  },
  {
    path: '/updateParam',
    component: () => import('@/views/layout/children/user/edit/UpdateParam')
  },
  // 用户详情
  {
    path: '/userDetail',
    component: () => import('@/views/userDetail')
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  // 好友列表
  {
    path: '/searchFriend',
    component: () => import('@/views/layout/children/message/searchFriend')
  },
  // 发送添加好友信息
  {
    path: '/sendAddFriend',
    component: () => import('@/views/layout/children/message/sendAddFriend')
  },
  // 接送好友请求
  {
    path: '/replyAddFriend',
    component: () => import('@/views/layout/children/message/replyAddFriend')
  },
  // Gemini
  {
    path: '/AIHelp',
    component: () => import('@/views/AI')
  }
]

const router = new VueRouter({
  routes
})
/* const authUrls = ['/']
router.beforeEach((to, from, next) => {
}) */
export default router
