import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

import { getToken } from '@/lib/util'

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (!token && to.name === 'login') {
    next()
  } else if (token && to.name === 'login') {
    next({
      name: 'Main'
    })
  } else {
    next()
  }
})

router.afterEach(route => {
  window.document.title =
    Vue.prototype.baseConfig.title +
    ' - ' +
    (route.meta && route.meta.title ? route.meta.title : route.name)
  // window.scrollTo(0, 0)
})

export default router
