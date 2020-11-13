import axiosInstance from "@/axios-instance";
import MovieDTO from '@/Models/MovieDTO';
import Planning from '@/Models/Planning';
import { RoomDTO } from "@/Models/RoomDTO";

import { Component, Vue } from "vue-property-decorator";

export interface IformModelMovie {
  title: string;
  desc: string;
  imageUrl: string;
  dateTimeSelected: Date;
  dateTimesList: Planning[];
  rooms: RoomDTO[];
  selectedRoom: number;
}

@Component
export default class AdminMovies extends Vue {
  isLoading = false;
  dialogVisible = false;
  movies: MovieDTO[] = [];
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  

  formModelMovie: IformModelMovie = {
    title: "",
    desc: "",
    imageUrl: "",
    dateTimeSelected: new Date(Date.now()),
    dateTimesList: [],
    rooms: [],
    selectedRoom: 0
  };

  async mounted() {
    await this.getMovies();
  }



  async getRooms() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get("/rooms");
      this.formModelMovie.rooms = response.data as RoomDTO[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async getMovies() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get("/movies");
      console.log(response.data);
      this.movies = (response.data as MovieDTO[]);
    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    }
    finally {
      this.isLoading = false;
    }
  }


  printMovieDate(movieDate: Planning): string {
    return `${this.formModelMovie.rooms.find(item => item.Id == movieDate.RoomId)?.Name} - ` + this.printDate(movieDate.Date);
  }

  printDate(date: Date): string {
    return date.toLocaleString("it", this.dateOptions);
  }

}
