import { Form } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import axiosInstance from '@/axios-instance';

@Component
export default class Login extends Vue {
  isLoading = false;
  formModel = {
    username: '',
    password: ''
  };

  get formRules() {
    const required = {
      required: true,
      message: 'Campo obbligatorio'
    };

    return {
      username: required,
      password: required
    };
  }

  async submit() {
    const $form = this.$refs.loginForm as Form;

    $form.validate(async (isValid) => {
      if (isValid) {
        this.isLoading = true;
        try {
          const request = {
            username: this.formModel.username,
            password: this.formModel.password
          };

          const response = await axiosInstance.post('/login', request);
          console.log(response);
          this.$router.replace('/admin/dashboard');
        } catch (error) {
          if (error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
        } finally {
          this.isLoading = false;
        }
      }
    });
  }
}
