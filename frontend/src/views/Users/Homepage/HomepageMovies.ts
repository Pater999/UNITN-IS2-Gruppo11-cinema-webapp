import axiosInstance from '@/axios-instance';
import MovieDTO from '@/Models/MovieDTO';
import Header from '@/components/Header/Header.vue';
import BookMovieComponent from './BookMovie/BookMovieComponent.vue';
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  components: { Header, BookMovieComponent },
  computed: {
    ...mapState(['isAuthenticated'])
  }
})
export default class HomepageMovies extends Vue {
  isLoading = false;
  isAuthenticated!: boolean;
  selectedPlan = '';
  movies: MovieDTO[] = [];
  dateTimeSelected = new Date(Date.now());
  bookingDialogVisible = false;
  selectedMovie: MovieDTO | null = null;

  async mounted() {
    await this.getMovies();
  }

  async getMovies() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get(`/movies?date=${this.dateTimeSelected.toUTCString()}`);
      this.movies = response.data as MovieDTO[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  bookMovie() {
    if (!this.selectedPlan) this.$message.error('Devi selezionare un orario!');
    else {
      if (!this.isAuthenticated) this.userNotLogged();
      else {
        const [movieId, planId] = this.selectedPlan.split('-');
        this.selectedMovie = { ...this.movies.find((k) => k._id == movieId) } as MovieDTO;
        this.selectedMovie.plans = [...this.selectedMovie.plans.filter((k) => k._id == planId)];
        this.bookingDialogVisible = true;
      }
    }
  }

  userNotLogged() {
    this.$confirm("A quanto pare non hai effettuato l'accesso. Per prenotare un film devi essere loggato!", 'Attenzione - Login richiesto', {
      confirmButtonText: 'Vai alla pagina di login',
      cancelButtonText: 'Annulla',
      type: 'warning'
    })
      .then(() => {
        this.$router.push('/login');
      })
      .catch(() => {
        console.log('Annullato');
      });
  }

  async dateChanged() {
    if (this.dateTimeSelected) {
      this.movies = [];
      this.selectedPlan = '';
      await this.getMovies();
    }
  }

  get isButtonDisabled() {
    return !(this.dateTimeSelected.setHours(0, 0, 0, 0) >= new Date(Date.now()).setHours(0, 0, 0, 0));
  }
}
