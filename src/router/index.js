import Vue from 'vue'
import Router from 'vue-router'
import bigdata from '@/components/page/bigdata'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bigdata',
      component: bigdata
    }
  ]
})
