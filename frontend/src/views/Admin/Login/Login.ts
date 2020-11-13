import { Form } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import axiosInstance from '@/axios-instance';
import { LOGIN, SET_USER } from '@/store/types/actions-types';

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
          await this.$store.dispatch(LOGIN, {
            token: response.data.token,
            authState: true
          });
          await this.$store.dispatch(SET_USER, { username: response.data.username, role: 'admin'});
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
