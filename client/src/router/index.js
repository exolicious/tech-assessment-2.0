import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/accounts',
    name: 'AccountsView',
    component: () => import(/* webpackChunkName: "accounts" */ '../views/AccountsView.vue')
  },
  {
    path: '/transactions/',
    name: 'TransactionsView',
    component: () => import(/* webpackChunkName: "transactions" */ '../views/TransactionsView.vue'),
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
