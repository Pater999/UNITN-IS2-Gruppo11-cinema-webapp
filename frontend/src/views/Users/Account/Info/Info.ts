import axiosInstance from "@/axios-instance";
import { Component, Vue } from "vue-property-decorator";
import { userDTO } from "@/Models/UserDTO";

@Component
export default class AccountInfo extends Vue {
  isLoading = false;
  accountInfo: any[] = [];

  async mounted() {
    await this.getAccount();
  }

  async getAccount() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get(`/users/${this.$store.state.userId}`);
      const user = response.data as userDTO;
      this.accountInfo.push({ name: "Ruolo", value: user.Role });
      this.accountInfo.push({ name: "Nome", value: user.Name });
      this.accountInfo.push({ name: "Cognome", value: user.Surname });
      this.accountInfo.push({ name: "Email", value: user.Email });
      this.accountInfo.push({ name: "Username", value: user.Username });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }
}
