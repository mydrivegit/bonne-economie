import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import signup from '@/components/signup'
import users from '@/components/users'
import messages from '@/components/messages'
import navbar from '@/components/navbar'
import newMessage from '@/components/newMessage'
import userProfile from '@/components/userProfile'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/users',
      name: 'users',
      components: {
        default: users, 'navbar': navbar },
      meta: { requiresAuth: true }
    },
    {
      path: '/messages',
      name: 'messages',
      components: {
        default: messages, 'navbar': navbar },
      meta: { requiresAuth: true }
    },
    {
      path: '/newMessage',
      name: 'newMessage',
      components: {
        default: newMessage, 'navbar': navbar },
      meta: { requiresAuth: true }
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      components: {
        default: userProfile, 'navbar': navbar
      },
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: {name: 'users'}
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
