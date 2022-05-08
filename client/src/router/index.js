import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AccountsView',
    component: () => import(/* webpackChunkName: "about" */ '../views/AccountsView.vue')
  },
  {
    path: '/transactions/',
    name: 'TransactionsView',
    component: () => import(/* webpackChunkName: "about" */ '../views/TransactionsView.vue'),
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
