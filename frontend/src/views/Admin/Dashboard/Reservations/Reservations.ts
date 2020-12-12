import axiosInstance from '@/axios-instance';
import ReservationDTO from '@/Models/ReservationDTO';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Reservations extends Vue {
  isLoading = false;
  reservations: ReservationDTO[] = [];
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  async mounted() {
    await this.fetchReservations();
  }

  async fetchReservations() {
    this.isLoading = true;
    try {
      let url = '/reservations';
      if (this.dateFrom && !this.dateTo) url += `?startDate=${this.dateFrom}`;
      if (this.dateTo && !this.dateFrom) url += `?endDate=${this.dateTo}`;
      if (this.dateTo && this.dateFrom) url += `?startDate=${this.dateFrom}&endDate=${this.dateTo}`;
      const response = await axiosInstance.get(url);
      this.reservations = response.data as ReservationDTO[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  dateChanged() {
    this.fetchReservations();
  }
}
