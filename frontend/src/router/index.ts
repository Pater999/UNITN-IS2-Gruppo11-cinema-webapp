import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const LoginPage = () => import(/* webpackChunkName: "login-page" */ '../views/Admin/Login/Login.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/admin/login',
    name: 'LoginPage',
    component: LoginPage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
