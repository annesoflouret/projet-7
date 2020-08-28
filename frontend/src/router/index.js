import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import User from '../views/User.vue'
import Signup from '../views/Signup.vue'
import Comments from '../views/Comments.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  },
  {
    path: '/comments',
    name: 'comments',
    component: Comments
  }
]

const router = new VueRouter({
  routes
})

export default router
