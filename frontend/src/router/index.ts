import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const AdminLoginPage = () => import(/* webpackChunkName: "admin-login-page" */ '../views/Admin/Login/Login.vue');
const AdminDashboardPage = () => import(/* webpackChunkName: "admin-dashboard-page" */ '../views/Admin/Dashboard/Dashboard.vue');
const AdminRoomPage = () => import(/* webpackChunkName: "admin-room-page" */ '../views/Admin/Dashboard/Rooms/RoomsMap/RoomsMap.vue');
const ErrorPage = () => import(/* webpackChunkName: "404-page" */ '../views/404/404.vue');
const UsersLoginPage = () => import(/* webpackChunkName: "users-login-page" */ '../views/Users/Login/UserLogin.vue');
const UsersHomePage = () => import(/* webpackChunkName: "users-home-page" */ '../views/Users/Homepage/HomepageMovies.vue');

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
    path: '/users/login',
    name: 'users-login-page',
    component: UsersLoginPage,
    meta: {
      title: `${appTitle} - Users login`
    }
  },
  {
    path: '/users/homepage',
    name: 'users-homepage-page',
    component: UsersHomePage,
    meta: {
      title: `${appTitle} - Users homepage`
    }
  },
  {
    path: '/404',
    name: '404-page',
    component: ErrorPage,        // Da sostituire con una pagina 404
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
