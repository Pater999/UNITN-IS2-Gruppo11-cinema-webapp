import { Component, Vue } from "vue-property-decorator";
import AdminRooms from "./Rooms/Rooms.vue"
import Fares from "./Fares/Fares.vue"

@Component({ components: { AdminRooms, Fares } })
export default class AdminDashboard extends Vue {

  logOut() {
    this.$router.replace("/admin/login");
  }

}
