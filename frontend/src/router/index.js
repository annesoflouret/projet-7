import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Posts from '../views/Posts.vue'
import User from '../views/User.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

// middleware pour ne pas acceder au page sans authentification
const guard = (to, from, next) => {
  if (localStorage.getItem("token") === null) {
    return next({
      path: "/login"
    });
  }
  next();
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    beforeEnter: guard
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    beforeEnter: guard
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  //  { path: "*", redirect: "/login" }
]

const router = new VueRouter({
  routes
})

export default router
