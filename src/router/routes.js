
import Login from '../views/Login.vue'
import Center from '../views/Center.vue'
import Mine from '../views/Mine.vue'

export const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/center',
      name: 'Center',
      component: Center
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    }
    // {
    //   path: '/about',
    //   name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]