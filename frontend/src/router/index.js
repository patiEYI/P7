// import { valueOf } from 'core-js'
import Vue from 'vue' 
import Router from 'vue-router' 


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
     
    },
    {
      path: '/signup',
      name: 'signup',
     
      // route level code-splitting
      // this generates a separate chunk (signup.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "signup" */ '../views/signup.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import(/* webpackChunkName: "forum" */ '../views/forum.vue')
     
    },
   {   
    path: '/profil/:userId',
    name: 'admin',
    component: () => import(/* webpackChunkName: "profil" */ '../views/profil.vue')
   },
   {   
    path: '/changeprofil',
    name: 'changeprofil',
    component: () => import(/* webpackChunkName: "changeprofil" */ '../views/changeprofil.vue')
   },
   {   
    path: '/updatepost',
    name: 'updatepost',
    component: () => import(/* webpackChunkName: "updatepost" */ '../views/updatepost.vue')
   },
   {   
    path: '/singlepost',
    name: 'singlepost',
    component: () => import(/* webpackChunkName: "singlepost" */ '../views/singlepost.vue')
   },
   {   
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/users.vue')
   },
   {   
    path: '/users/:id',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/users.vue')
   },
   {   
    path: '/userpost',
    name: 'userpost',
    component: () => import(/* webpackChunkName: "user" */ '../views/userpost.vue')
   },
   {   
    path: '/password',
    name: 'password',
    component: () => import(/* webpackChunkName: "password" */ '../views/password.vue')
   },
  
  ]
})

 


