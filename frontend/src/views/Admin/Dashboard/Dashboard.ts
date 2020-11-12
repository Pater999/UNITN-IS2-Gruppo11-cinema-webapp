import { Component, Vue } from 'vue-property-decorator';
import AdminRooms from './Rooms/Rooms.vue';
import Fares from './Fares/Fares.vue';
import AdminMovies from './Movies/Movies.vue';
import Header from '@/components/Header/Header.vue';
import { CWrapper } from '@coreui/vue';

@Component({ components: { AdminRooms, Fares, AdminMovies, Header, CWrapper } })
export default class AdminDashboard extends Vue {}
