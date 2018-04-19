import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/auth/login'
import signup from '@/components/auth/signup'
import navbar from '@/components/navbar'
import users from '@/components/user/users'
import userProfile from '@/components/user/userProfile'
import sidebar from '@/components/user/sidebar'
import messages from '@/components/message/messages'
import messageView from '@/components/message/messageView'
import newMessage from '@/components/message/newMessage'
import newProduct from '@/components/product/newProduct'
import product from '@/components/product/product'
import productView from '@/components/product/productView'
import myProductList from '@/components/product/myProductList'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
      meta: { requiresAuth: false }
    },
    {
      path: '/users',
      name: 'users',
      components: {
        default: users, 'navbar': navbar }
    },
    {
      path: '/messages',
      name: 'messages',
      components: {
        default: messages, 'navbar': navbar }
    },
    {
      path: '/newMessage',
      name: 'newMessage',
      components: {
        default: newMessage, 'navbar': navbar }
    },
    {
      path: '/messageView/:messageId',
      name: 'messageView',
      components: {
        default: messageView, 'navbar': navbar
      }
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      components: {
        default: userProfile, 'navbar': navbar, 'sidebar': sidebar
      }
    },
    {
      path: '/newProduct',
      name: 'newProduct',
      components: {
        default: newProduct, 'navbar': navbar, 'sidebar': sidebar
      }
    },
    {
      path: '/Product',
      name: 'product',
      components: {
        default: product, 'navbar': navbar
      },
      meta: { requiresAuth: false }
    },
    {
      path: '/ProductView/:productId',
      name: 'productView',
      components: {
        default: productView, 'navbar': navbar
      }
    },
    {
      path: '/myProductList',
      name: 'myProductList',
      components: {
        default: myProductList, 'navbar': navbar, 'sidebar': sidebar
      }
    },
    {
      path: '*',
      redirect: {name: 'product'}
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth === false)) {
    next() // make sure to always call next()!
  } else {
    // this route requires auth, check if logged in
    if (localStorage.getItem('token')) {
      next()
    } else {
      // if not, redirect to login page.
      next({ name: 'login' })
    }
  }
})

export default router
