import axiosInstance from "@/axios-instance";
//import Movie from '@/Models/Movie';
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
  selectedRoom: number;
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
    selectedRoom: 0
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
      await axiosInstance.delete(`/admin/Movies/${movie.Id}/plannings`);
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
      const response = await axiosInstance.get("/admin/rooms");
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
      const response = await axiosInstance.get("/admin/movies");
      console.log(response.data);
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
    this.formModelMovie.selectedRoom = this.formModelMovie.rooms[0].Id;
    this.formModelMovie.dateTimesList = [];
    //this.formModelMovie.imageUrl = "https://images-na.ssl-images-amazon.com/images/I/81oND6XuHsL._SY679_.jpg"

    const date = this.formModelMovie.dateTimeSelected;
    this.formModelMovie.dateTimeSelected.setDate(date.getDate() + 1);
  }

  printMovieDate(movieDate: Planning): string
  {
    return `${this.formModelMovie.rooms.find(item => item.Id == movieDate.RoomId)?.Name} - ` + this.printDate(movieDate.Date);
  }

  printDate(date: Date): string
  {
    return date.toLocaleString("it", this.dateOptions);
  }

  addMovieDate()
  {
    const date = this.formModelMovie.dateTimeSelected;
    const room = this.formModelMovie.selectedRoom;

    if (date && room)
    { 
      if (date >= new Date(Date.now()))
      {     
        const Movie = new Planning(date, room);
        if (!this.formModelMovie.dateTimesList.find(item => item.Date == Movie.Date && item.RoomId == Movie.RoomId))
        {
          this.formModelMovie.dateTimesList.push(Movie);
          this.formModelMovie.dateTimesList.sort((item1, item2) => item1.Date.getDate() - item2.Date.getDate());
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
    const index = this.formModelMovie.dateTimesList.findIndex(item => item.Date == movie.Date && item.RoomId == movie.RoomId);
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
          let response = await axiosInstance.post("/admin/movies", { title: this.formModelMovie.title, imageUrl:this.formModelMovie.imageUrl, desc: this.formModelMovie.desc } );//new Movie(this.formModelMovie.imageUrl, this.formModelMovie.title, this.formModelMovie.desc));
          
          response = await axiosInstance.post(`/admin/movies/${(response.data as MovieDTO).Id}/plannings`, { planning: this.formModelMovie.dateTimesList });
          console.log(response);
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
      {
        this.$message.error("Deve esserci almeno una programmazione!");
      }
    }



    // const $form = this.$refs.RoomForm as Form;

    // $form.validate(async (isValid) => {
    //   if (isValid) {
    //     this.isLoading = true;
    //     try {
    //       //await axiosInstance.post("/admin/movies", this.formModelMovie);
    //       //this.$message.success("Fi aggiunta con successo!");
    //     } catch (error) {
    //       if (error.response.data && error.response.data.error)
    //         this.$message.error(error.response.data.error);
    //     } finally {
    //       $form.resetFields();

    //       this.isLoading = false;
    //       this.dialogVisible = false;
    //     }
    //   }
    // });
  }
}
