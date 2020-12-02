import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store/store';

const AdminLoginPage = () => import(/* webpackChunkName: "admin-login-page" */ '../views/Admin/Login/Login.vue');
const AdminDashboardPage = () => import(/* webpackChunkName: "admin-dashboard-page" */ '../views/Admin/Dashboard/Dashboard.vue');
const AdminRoomPage = () => import(/* webpackChunkName: "admin-room-page" */ '../views/Admin/Dashboard/Rooms/RoomsMap/RoomsMap.vue');
const ErrorPage = () => import(/* webpackChunkName: "404-page" */ '../views/404/404.vue');
const UsersLoginPage = () => import(/* webpackChunkName: "users-login-page" */ '../views/Users/Login/UserLogin.vue');
const UsersRegisterPage = () => import(/* webpackChunkName: "users-register-page" */ '../views/Users/Register/UserRegister.vue');
const UsersHomePage = () => import(/* webpackChunkName: "users-home-page" */ '../views/Users/Homepage/HomepageMovies.vue');
const UsersComunications = () => import(/* webpackChunkName: "users-comunications-page" */ '../views/Users/Comunications/UsersComunications.vue');


const appTitle = 'SmartCinema';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/', // TEMPORANEO DA RIMUOVERE!
    redirect: '/homepage'
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
      title: `${appTitle} - Admin dashboard`,
      auth: true,
      roles: ['admin']
    }
  },
  {
    path: '/admin/dashboard/room/:id',
    name: 'admin-room-page',
    component: AdminRoomPage,
    meta: {
      title: `${appTitle} - Admin room`,
      auth: true,
      roles: ['admin']
    }
  },
  {
    path: '/login',
    name: 'users-login-page',
    component: UsersLoginPage,
    meta: {
      title: `${appTitle} - Users login`
    }
  },
  {
    path: '/register',
    name: 'users-register-page',
    component: UsersRegisterPage,
    meta: {
      title: `${appTitle} - Users register`
    }
  },
  {
    path: '/homepage',
    name: 'users-homepage-page',
    component: UsersHomePage,
    meta: {
      title: `${appTitle} - Users homepage`
    }
  },

  {
    path: '/comunications',
    name: 'users-comunications-page',
    component: UsersComunications,
    meta: {
      title: `${appTitle} - Users comunication`
    }
  },

  {
    path: '/404',
    name: '404-page',
    component: ErrorPage,
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

// CAMBIO TITOLO
router.afterEach(async (to) => {
  document.title = to.meta.title;
});

// CONTROLLO SE SONO LOGGATO PRIMA DI VISITARE PAGINE RISERVATE
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.auth);
  const allowedRoles = to.meta.roles as string[];
  const { isAuthenticated } = store.getters;

  if (requiresAuth && !isAuthenticated) {
    const token = store.state.token;

    if (token) {
      next();
    } else {
      if (allowedRoles.includes('admin')) next('/admin/login');
      else next('/users/login');
    }
  } else if (requiresAuth && isAuthenticated && !allowedRoles.includes(store.state?.role)) {
    next(false);
  } else {
    next();
  }
});

export default router;
