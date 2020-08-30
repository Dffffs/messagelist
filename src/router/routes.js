
import Login from '../views/Login.vue'
import Center from '../views/Center.vue'
import Mine from '../views/Mine.vue'
import Wrong from '../views/404.vue'

export const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Center',
      component: Center
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/wrong',
      name: 'Wrong',
      component: Wrong
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