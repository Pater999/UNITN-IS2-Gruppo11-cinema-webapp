import { Form } from "element-ui";
import { Component, Vue } from "vue-property-decorator";
import axiosInstance from "@/axios-instance";
import Header from "@/components/Header/Header.vue";
import AccountInfo from "./Info/Info.vue";
import AccountReservations from "./Reservations/Reservations.vue";

@Component({
  components: { Header, AccountInfo, AccountReservations },
})
export default class UserLogin extends Vue {
  activeName = "Account";
  passwordLoading = false;
  dialogVisible = false;
  labelPosition = "right";

  formModifyPassword = {
    nuovaPassword: "",
    nuovaPasswordCheck: "",
  };

  async changePassword(newPassword: string) {
    try {
      const response = await axiosInstance.put(`/users/${this.$store.state.userId}/change-password`, { nuovaPassword: newPassword });
      this.$message.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.passwordLoading = false;
      this.dialogVisible = false;
    }
  }

  get formRules() {
    const required = {
      required: true,
      message: "Campo obbligatorio",
    };

    return {
      nuovaPassword: required,
      nuovaPasswordCheck: required,
    };
  }

  modifyPassword() {
    this.dialogVisible = true;
  }

  async confirmPasswordChange() {
    const $form = this.$refs.PasswordForm as Form;
    $form.validate(async (isValid) => {
      if (isValid) {
        if (this.formModifyPassword.nuovaPassword == this.formModifyPassword.nuovaPasswordCheck) {
          this.passwordLoading = true;
          await this.changePassword(this.formModifyPassword.nuovaPassword);
        } else this.$message.error("Le Password non corrispondono!");
      }
    });
  }
}
