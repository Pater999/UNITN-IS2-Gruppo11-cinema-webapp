import axiosInstance from '@/axios-instance';
import { FareDto } from '@/Models/FareDto';
import MovieDTO from '@/Models/MovieDTO';
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState(['userId'])
  }
})
export default class BookMovieComponent extends Vue {
  @PropSync('dialogIsVisible', { type: Boolean, required: true })
  dialogVisible!: boolean;
  @Prop({ required: true })
  readonly movie!: MovieDTO;

  userId!: string;
  fares: FareDto[] = [];
  selectedFare = '';
  numberOfTickets = 1;
  isLoading = false;

  mounted() {
    this.getFares();
  }

  async bookMovie() {
    this.isLoading = true;
    try {
      for (let i = 0; i < this.numberOfTickets; i++) {
        await axiosInstance.post(`/movies/${this.movie._id}/plannings/${this.movie.plans[0]._id}/reservations`, { userId: this.userId, fareId: this.selectedFare });
      }

      this.$message.success('Prenotazione effettuata con successo!');
    } catch (error) {
      if (error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
      this.dialogVisible = false;
    }
  }

  async getFares() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get('/Fares');
      this.fares = response.data as FareDto[];
      this.selectedFare = this.fares[0]._id;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }
}
