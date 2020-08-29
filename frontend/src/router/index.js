import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Posts from '../views/Posts.vue'
import User from '../views/User.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
]

const router = new VueRouter({
  routes
})

export default router
