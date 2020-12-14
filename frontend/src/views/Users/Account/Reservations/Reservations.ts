import axiosInstance from "@/axios-instance";
import { Component, Vue } from "vue-property-decorator";
import ReservationDTO from '@/Models/ReservationDTO';

@Component
export default class AccountReservations extends Vue {
    isLoading = false;
    reservations: ReservationDTO[] = [];

    async mounted() {
        await this.getReservations();
      }

    async getReservations() {
        this.isLoading = true;
        try {
          const response = await axiosInstance.get(`/users/${this.$store.state.userId}/reservations`);
          this.reservations = response.data as ReservationDTO[];
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
        } finally {
          this.isLoading = false;
        }
      }
}