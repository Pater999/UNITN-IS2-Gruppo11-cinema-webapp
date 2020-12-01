import axiosInstance from "@/axios-instance";
import { AdDto } from "@/Models/AdDto";
import { Form } from "element-ui";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminAds extends Vue {
  isLoading = false;

  dialogVisible = false;

  Ads: AdDto[] = [];

  formLabelWidth = "100px";

  formModelAd = {
    title: "",
    ad: "",
    date: new Date().toLocaleString(),
  };

  async mounted() {
    await this.getAds();
  }

  logOut() {
    this.$router.replace("/admin/login");
  }

  async deleteAd(row: AdDto) {
    this.isLoading = true;
    try {
      const response = await axiosInstance.delete(`/Ads/${row._id}`);
      this.$message.success(response.data.message);
      await this.getAds();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async getAds() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get("/Ads");
      this.Ads = response.data as AdDto[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async addAd() {
    this.dialogVisible = true;
  }

  get formRules() {
    const required = {
      required: true,
      message: "Campo obbligatorio",
    };

    return {
      title: required,
      ad: required,
      date: required,
    };
  }

  async confirmAd() {
    const $form = this.$refs.formModelAd as Form;

    $form.validate(async (isValid) => {
      if (isValid) {
        this.isLoading = true;
        try {
          await axiosInstance.post("/Ads", this.formModelAd);
          this.$message.success("Annuncio aggiunto con successo!");
          await this.getAds();
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
