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
    path: '/transactions',
    name: 'TransactionsView',
    component: () => import(/* webpackChunkName: "transactions" */ '../views/TransactionsView.vue'),
    props: true,
  },
  {
    path: '/redirect',
    name: 'RedirectView',
    component: () => import(/* webpackChunkName: "transactions" */ '../views/RedirectView.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.name === "AccountsView" && from.name === "TransactionsView")
    to.meta.transition = "fade-slide-right";
  else
    to.meta.transition = "fade-slide-left";

  next();
})


export default router
