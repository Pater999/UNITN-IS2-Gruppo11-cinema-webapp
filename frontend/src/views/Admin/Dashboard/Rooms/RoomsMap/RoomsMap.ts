import { Component, Vue } from 'vue-property-decorator';
import axiosInstance from '@/axios-instance';
import Header from '@/components/Header/Header.vue';
import { RoomRowDTO } from '@/Models/RoomRowDTO';

@Component({ components: { Header } })
export default class RoomsMap extends Vue {
  isLoading = false;
  roomId: string | null = null;
  rows: RoomRowDTO[] = [];

  formModel = {
    seatsNumber: 1
  };

  mounted() {
    if (this.$route.params.id) this.roomId = this.$route.params.id;
    this.fetchRows();
  }

  async fetchRows() {
    if (!this.roomId) return;

    this.isLoading = true;
    try {
      const response = await axiosInstance.get(`/rooms/${this.roomId}/rows`);
      this.rows = response.data as RoomRowDTO[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async addRow() {
    this.isLoading = true;
    try {
      await axiosInstance.post(`/rooms/${this.roomId}/rows`, this.formModel);
      this.$message.success('Nuova fila aggiunta con successo!');
      await this.fetchRows();
    } catch (error) {
      if (error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.formModel.seatsNumber = 0;
      this.isLoading = false;
    }
  }

  goBack() {
    this.$router.push('/admin/dashboard');
  }
}
