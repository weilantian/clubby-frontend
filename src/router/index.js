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
        path: 'user/create',
        name:'CreateUser',
        component: ()=> import(/* webpackChunkName: "userCreate"*/ '../views/User/CreateUser.vue')
      },
      {
        path: 'course',
        name: 'Class',
        component: ()=> import(/* webpackChunkName: "allClasses"*/ '../views/Class/Classes')
      },
      {
        path: 'course/:id',
        name:"CourseDetail",
        component: ()=> import(/* webpackChunkName: "courseDetail")*/"../views/Class/CourseDetail.vue")
      },
      {
        path: 'course/create',
        name:"CreateCourse",
        component: ()=> import(/* webpackChunkName: "createCourse"*/ "../views/Class/CreateCourse")
      }
    ]
  },
  {
    path: '/',
    redirect:'/dashboard/general'
  },
  {
    path:'/activate',
    component: ()=>import(/* webpackChunkName: "activateAccount"*/ '../views/ActivateAccount')
  },
  {
    path: '/login',
    component: ()=>import(/* webpackChunkName: "login"*/ '../views/Login')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=> {
  const autoNavigate = to.path !== '/activate' && to.path!=='/login'
  Promise.all([store.dispatch('checkAuth',autoNavigate)]).then(()=>next())




})

export default router
