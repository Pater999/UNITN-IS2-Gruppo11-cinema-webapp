import axiosInstance from "@/axios-instance";
import { ComunicationDto } from "@/Models/ComunicationDto";
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header/Header.vue";

@Component({ components: { Header } })
export default class AdminComunications extends Vue {
  isLoading = false;

  Comunications: ComunicationDto[] = [];

  async mounted() {
    await this.getComunications();
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

  async openMsg(row: ComunicationDto) {
    this.$alert(row.desc, row.title, {
      confirmButtonText: "Chiudi",
    });
  }
}
