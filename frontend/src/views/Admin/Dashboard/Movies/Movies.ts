//import axiosInstance from "@/axios-instance";
//import { RoomDTO } from "@/Models/RoomDTO";
import { Form } from "element-ui";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminMovies extends Vue {
  isLoading = false;

  dialogVisible = false;

  formLabelWidth = "120px";

  formModelMovie = {
    title: "",
    desc: "",
    imageUrl: ""
  };

  async addMovie() {
    this.dialogVisible = true;
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

  async confirmMovie() {
    const $form = this.$refs.RoomForm as Form;

    $form.validate(async (isValid) => {
      if (isValid) {
        this.isLoading = true;
        try {
          //await axiosInstance.post("/admin/movies", this.formModelMovie);
          //this.$message.success("Fi aggiunta con successo!");
        } catch (error) {
          if (error.response.data && error.response.data.error)
            this.$message.error(error.response.data.error);
        } finally {
          $form.resetFields();

          this.isLoading = false;
          this.dialogVisible = false;
        }
      }
    });
  }
}
