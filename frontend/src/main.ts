import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// COREUI
import { CHeader, CHeaderBrand, CHeaderNav, CDropdown, CDropdownHeader, CDropdownItem, CHeaderNavLink, CWrapper} from '@coreui/vue';
Vue.component('CWrapper', CWrapper);
Vue.component('CHeader', CHeader);
Vue.component('CHeaderBrand', CHeaderBrand);
Vue.component('CHeaderNav', CHeaderNav);
Vue.component('CDropdownHeader', CDropdownHeader);
Vue.component('CDropdown', CDropdown);
Vue.component('CDropdownItem', CDropdownItem);
Vue.component('CHeaderNavLink', CHeaderNavLink);

import locale from 'element-ui/lib/locale/lang/it';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, faUser, faCouch, faSignInAlt, faUserCog, faAddressCard } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';
import store from './store/store';

import { READ_TOKEN, READ_USER } from '@/store/types/actions-types';

Vue.config.productionTip = false;

store.dispatch(READ_TOKEN);
store.dispatch(READ_USER);
Vue.use(ElementUI, { locale });

library.add(faUser);
library.add(faSignOutAlt);
library.add(faSignInAlt);
library.add(faCouch);
library.add(faUserCog);
library.add(faAddressCard);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
