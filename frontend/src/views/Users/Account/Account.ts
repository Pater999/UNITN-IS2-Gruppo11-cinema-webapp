import { Form } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import axiosInstance from '@/axios-instance';
import Header from '@/components/Header/Header.vue';

@Component({
  components: { Header }
})
export default class UserLogin extends Vue {
  isLoading = false;
  passwordLoading = false;
  dialogVisible = false;
  labelPosition = "right";
  formModelAccount = {
    _id: '',
    role: '',
    name: '',
    surname: '',
    username: '',
    email: ''
  };

  formModifyPassword =
    {
      nuovaPassword: '',
      nuovaPasswordCheck: ''
    }

  async mounted() {
    this.isLoading = true;
    await this.getAccount();
  }

  async getAccount() {

    try {
      const response = await axiosInstance.get(`/users/${this.$store.state.userId}`);
      this.formModelAccount = response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

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
      message: 'Campo obbligatorio'
    };

    return {
      nuovaPassword: required,
      nuovaPasswordCheck: required
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
        }
        else
          this.$message.error("Le Password non corrispondono!")
      }
    });
  }
}
