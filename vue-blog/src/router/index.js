import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Home from '../views/Home.vue'
import Article from '../views/Article'
import ArticleList from '../views/ArticleList'
import Column from '../views/Column'
import Editor from '../views/Editor'
import BaseUser from '@/components/base/BaseUser'
import Socket from '../views/Socket'
import Base404 from '@/components/base/Base404'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    children: [
      { path: '/index', name: 'index', component: ArticleList },
      {
        path: '/column',
        component: Column,
        meta: {
          requiresAuth: true
        }
      },
      { path: '/article/:id', component: Article, name: 'article' },
      {
        path: '/editor',
        name: 'editor',
        component: Editor
      },
      {
        path: '/index',
        name: 'search',
        component: ArticleList
      },
      {
        path: '/user',
        component: BaseUser,
        name: 'user',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/socket',
        name: 'socket',
        component: Socket
      },
      // 添加404页面路由
      {
        path: '/404',
        name: '404',
        component: Base404
      },
      // 添加通配符路由，处理所有未匹配的路径
      {
        path: '*',
        redirect: '/404'
      }
    ]
  }

]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let useAuth = to.meta.requiresAuth
  if (useAuth && !store.state.token) {
    Vue.prototype.$notify.warning({
      title: '通知',
      message: `请先登录`
    })
    NProgress.done()
    next('/index')
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})


export default router
