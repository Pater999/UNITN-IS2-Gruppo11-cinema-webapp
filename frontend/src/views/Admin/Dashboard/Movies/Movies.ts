import axiosInstance from "@/axios-instance";
import Planning from '@/Models/Planning';
import { RoomDTO } from "@/Models/RoomDTO";
import MovieDTO from "@/Models/MovieDTO";
import { Form } from "element-ui";
import { Component, Vue } from "vue-property-decorator";

export interface IformModelMovie {
  title: string;
  desc: string;
  imageUrl: string;
  dateTimeSelected: Date;
  dateTimesList: Planning[];
  rooms: RoomDTO[];
  selectedRoom: string;
}

@Component
export default class AdminMovies extends Vue {
  isLoading = false;

  isNextStep = false;

  dialogVisible = false;

  formLabelWidth = "120px";

  movies: MovieDTO[] = [];

  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  formModelMovie: IformModelMovie = {
    title: "",
    desc: "",
    imageUrl: "",
    dateTimeSelected: new Date(Date.now()),
    dateTimesList: [],
    rooms: [],
    selectedRoom: ""
  };

  async mounted() {
    await this.getMovies();
  }

  async deleteFilm(movie: MovieDTO)
  {
    await this.deleteMovie(movie);
    await this.getMovies();
  }

  async deleteMovie(movie: MovieDTO) {
    this.isLoading = true;
    try {
      await axiosInstance.delete(`/Movies/${movie._id}`);
      this.$message.success("Film eliminato con successo!");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
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

  async getMovies() 
  {
    this.isLoading = true;
    try 
    {
      const response = await axiosInstance.get("/movies");
      this.movies = (response.data as MovieDTO[]);
    } 
    catch (error) 
    {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } 
    finally 
    {
      this.isLoading = false;
    }
  }

  async addMovie() 
  {
    await this.getRooms();
    this.dialogVisible = true;
    this.isNextStep = false;
    this.formModelMovie.selectedRoom = this.formModelMovie.rooms[0]._id;
    this.formModelMovie.dateTimesList = [];
    this.formModelMovie.imageUrl = ""

    const date = this.formModelMovie.dateTimeSelected;
    this.formModelMovie.dateTimeSelected.setDate(date.getDate() + 1);
  }

  printMovieDate(movieDate: Planning): string
  {
    return `${this.formModelMovie.rooms.find(item => item._id == movieDate.roomId)?.name} - ` + this.printDate(movieDate.date);
  }

  printDate(date: Date): string
  {
    return date.toLocaleString("it", this.dateOptions);
  }

  addMovieDate()
  {
    const date = this.formModelMovie.dateTimeSelected;
    const roomId = this.formModelMovie.selectedRoom;

    if (date && roomId)
    { 
      if (date >= new Date(Date.now()))
      {     
        const Movie = {date, roomId};
        if (!this.formModelMovie.dateTimesList.find(item => item.date.toUTCString() == Movie.date.toUTCString() && item.roomId == Movie.roomId))
        {
          this.formModelMovie.dateTimesList.push(Movie);
          this.formModelMovie.dateTimesList.sort((item1, item2) => item1.date.getDate() - item2.date.getDate());
        }
        else
          this.$message.error("Il film è già stato programmato per questa data e per questa sala!");
      }
      else
        this.$message.error("La data selezionata è già passata!");
    }
    else
      this.$message.error("Devi selezionare una data e una sala!");
  }

  deleteMovieDate(movie: Planning)
  {
    const index = this.formModelMovie.dateTimesList.findIndex(item => item.date == movie.date && item.roomId == movie.roomId);
    if (index != -1)
    {
      this.formModelMovie.dateTimesList.splice(index, 1);
      this.$message.success("Programmazione rimossa con successo!");
    }
  }

  get formRules() {
    const required = {
      required: true,
      message: "Campo obbligatorio",
    };

    return {
      title: required,
      desc: required,
      imageUrl: required
    };
  }

  async confirmMovie() 
  {
    if (!this.isNextStep)
    {
      //Primo Step
      const $form = this.$refs.MovieForm as Form;
      $form.validate(async (isValid) => 
      {
        if (isValid) 
          this.isNextStep = true;
      });
    }
    else
    {
      //Secondo Step
      if (this.formModelMovie.dateTimesList.length > 0)
      {
        this.isLoading = true;
        try 
        {
          const response = await axiosInstance.post("/movies", { title: this.formModelMovie.title, imageUrl:this.formModelMovie.imageUrl, desc: this.formModelMovie.desc } );
          await axiosInstance.post(`/movies/${(response.data as MovieDTO)._id}/plannings`, { plannings: this.formModelMovie.dateTimesList });
          this.$message.success("Programmazione Film aggiunta con successo!");
          await this.getMovies();
        } 
        catch (error) 
        {
          if (error.response.data && error.response.data.error)
            this.$message.error(error.response.data.error);
        } 
        finally 
        {
          this.isLoading = false;
          this.dialogVisible = false;
        }
      }
      else
        this.$message.error("Deve esserci almeno una programmazione!");
    }
  }
}
