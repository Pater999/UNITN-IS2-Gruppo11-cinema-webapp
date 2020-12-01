import axiosInstance from "@/axios-instance";
import { ComunicationDto } from "@/Models/ComunicationDto";
import { Form } from "element-ui";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminComunications extends Vue {
  isLoading = false;

  dialogVisible = false;

  Comunications: ComunicationDto[] = [];

  formLabelWidth = "100px";

  formModelComunication = {
    title: "",
    desc: "",
    date: new Date().toLocaleString(),
  };

  async mounted() {
    await this.getComunications();
  }

  logOut() {
    this.$router.replace("/admin/login");
  }

  async deleteComunication(row: ComunicationDto) {
    this.isLoading = true;
    try {
      const response = await axiosInstance.delete(`/comunications/${row._id}`);
      this.$message.success(response.data.message);
      await this.getComunications();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async getComunications() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get("/comunications");
      this.Comunications = response.data as ComunicationDto[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async addComunication() {
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
      date: required,
    };
  }

  async confirmComunication() {
    const $form = this.$refs.formModelComunication as Form;

    $form.validate(async (isValid) => {
      if (isValid) {
        this.isLoading = true;
        try {
          await axiosInstance.post("/comunications", this.formModelComunication);
          this.$message.success("Annuncio aggiunto con successo!");
          await this.getComunications();
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
