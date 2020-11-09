import { Component, Vue } from "vue-property-decorator";
import AdminRooms from "./Rooms/Rooms.vue";
import Fares from "./Fares/Fares.vue";
import AdminMovies from "./Movies/Movies.vue";

@Component({ components: { AdminRooms, Fares, AdminMovies } })
export default class AdminDashboard extends Vue {

  logOut() {
    this.$router.replace("/admin/login");
  }

}
