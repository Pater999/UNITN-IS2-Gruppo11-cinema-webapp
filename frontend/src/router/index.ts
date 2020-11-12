import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const AdminLoginPage = () => import(/* webpackChunkName: "admin-login-page" */ '../views/Admin/Login/Login.vue');
const AdminDashboardPage = () => import(/* webpackChunkName: "admin-dashboard-page" */ '../views/Admin/Dashboard/Dashboard.vue');
const AdminRoomPage = () => import(/* webpackChunkName: "admin-room-page" */ '../views/Admin/Dashboard/Rooms/RoomsMap/RoomsMap.vue');

const appTitle = 'SmartCinema';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/', // TEMPORANEO DA RIMUOVERE!
    redirect: '/admin/login'
  },
  {
    path: '/admin',
    redirect: '/admin/login'
  },
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
  },
  {
    path: '/admin/dashboard/room/:id',
    name: 'admin-room-page',
    component: AdminRoomPage,
    meta: {
      title: `${appTitle} - Admin room`
    }
  },
  {
    path: '/404',
    name: '404-page',
    component: AdminDashboardPage,        // Da sostituire con una pagina 404
    meta: {
      title: `${appTitle} - Page 404`
    }
  },
  {
    path: '*',
    redirect: '/404'
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
