import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { AV } from '@/public/ApiBase.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode:"history"
})

router.beforeEach(async (to, from, next) => {
  const currentUser = AV.User.current()
  if (currentUser) {
    currentUser.isAuthenticated().then((authenticated) => {
      if (to.name === 'Login') { // 访问login,缓存判断
        if (authenticated) { //有缓存，访问主页
          next({ name: 'Center' });
        } else {// 无缓存，跳转登录页
          next();
        }
    
      } else if (to.name !== 'Login' && authenticated) { // 访问非登录页，有缓存，继续跳转该页面
        next();
    
      } else if (to.name !== 'Login' && !authenticated) {
        next({ name: 'Login' }); // 访问非登录页，无缓存，跳转login
      }
    });
  } else {
    if (to.name === 'Login') { // 访问login,缓存判断
      next()
    } else {
      next({ name: 'Login' });
    }
  }
})

export default router
