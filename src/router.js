import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import CaseManage from './views/CaseManage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login
    },
    {
      path: '/case',
      name: 'case',
      component: Home,
      children:[
        {
          path:'',
          component:CaseManage
        },
        {
          path:'caseManage',
          component:CaseManage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    // }
  ]
})
