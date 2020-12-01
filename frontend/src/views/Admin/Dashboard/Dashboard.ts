import { Component, Vue } from 'vue-property-decorator';
import AdminRooms from './Rooms/Rooms.vue';
import Fares from './Fares/Fares.vue';
import Ads from './Ads/Ads.vue';
import AdminMovies from './Movies/Movies.vue';
import AdminUsers from './Users/Users.vue';
import Header from '@/components/Header/Header.vue';
import Reservations from './Reservations/Reservations.vue';
import { CWrapper } from '@coreui/vue';

@Component({ components: { AdminRooms, Fares, AdminMovies, AdminUsers, Ads, Header, CWrapper, Reservations } })
export default class AdminDashboard extends Vue {
  activeName = 'Fares';
}
