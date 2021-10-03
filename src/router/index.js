import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/General/General.vue'
import store from '@/store'
import Dashboard from "@/views/Dashboard";
const routes = [
  {
    path:'/dashboard',
    component: Dashboard,
    children: [
      {
        path: 'general',
        name:"General",
        component: Home,
      },
      {
        path: 'general/modify',
        name: 'ModifyClubInfo',
        component: ()=> import(/* webpackChunkName: "editClubInfo" */'@/views/General/ClubInfoEdit.vue')
      },
      {
        path: 'user',
        name: 'User',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "user" */ '../views/User/Users.vue')
      },
      {
        path: 'user/:id',
        name:'UserDetail',
        component: ()=> import(/* webpackChunkName: "userDetail"*/'../views/User/UserDetail.vue')
      },
      {
        path: 'user/:id/modify',
        name:'UserModify',
        component: ()=> import(/* webpackChunkName: "userModify"*/'../views/User/EditUserDetail.vue')
      },
      {
        path: 'user/create',
        name:'CreateUser',
        component: ()=> import(/* webpackChunkName: "userCreate"*/ '../views/User/CreateUser.vue')
      }
    ]
  },
  {
    path: '/',
    redirect:'/dashboard/general'
  },
  {
    path:'/activate',
    component: import(/* webpackChunkName: "activateAccount"*/ '../views/ActivateAccount')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=> {
  Promise.all([store.dispatch('checkAuth')]).then(()=>next())
})

export default router
