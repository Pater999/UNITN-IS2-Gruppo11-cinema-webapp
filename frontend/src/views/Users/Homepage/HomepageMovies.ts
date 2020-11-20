import axiosInstance from "@/axios-instance";
import MovieDTO from "@/Models/MovieDTO";
import Header from "@/components/Header/Header.vue";

import { Component, Vue } from "vue-property-decorator";


@Component({ components: { Header } })
export default class HomepageMovies extends Vue {
  
  isLoading = false;
  movies: MovieDTO[] = [];
  dateTimeSelected = new Date(Date.now());
 
  async mounted() {
    await this.getMovies();
  }

  async getMovies() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get(
        `/movies?date=${this.dateTimeSelected.toUTCString()}`
      );
      this.movies = response.data as MovieDTO[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async dateChanged() {
    if (this.dateTimeSelected) {
      this.movies = [];
      await this.getMovies();
    }
  }

}



