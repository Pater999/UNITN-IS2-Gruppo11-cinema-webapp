import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const AdminLoginPage = () => import(/* webpackChunkName: "admin-login-page" */ '../views/Admin/Login/Login.vue');
const AdminDashboardPage = () => import(/* webpackChunkName: "admin-dashboard-page" */ '../views/Admin/Dashboard/Dashboard.vue');

const appTitle = 'SmartCinema';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/admin/login',
    name: 'admin-login-page',
    component: AdminLoginPage,
    meta: {
      title: `${appTitle} - Admin login`
    }
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard-page',
    component: AdminDashboardPage,
    meta: {
      title: `${appTitle} - Admin dashboard`
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.afterEach(async (to) => {
  document.title = to.meta.title;
});

export default router;
