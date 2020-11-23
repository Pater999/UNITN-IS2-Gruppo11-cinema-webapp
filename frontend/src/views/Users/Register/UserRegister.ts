import { Form } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import axiosInstance from '@/axios-instance';

@Component
export default class UserRegister extends Vue {
  isLoading = false;
  formModel = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: ''
  };

  get formRules() {
    const required = {
      required: true,
      message: 'Campo obbligatorio'
    };

    return {
      name: required,
      surname: required,
      username: required,
      email: required,
      password: required
    };
  }

  async submit() {
    const $form = this.$refs.registerForm as Form;

    $form.validate(async (isValid) => {
      if (isValid) {
        this.isLoading = true;
        try {
          const request = {
            name: this.formModel.name,
            surname: this.formModel.surname,
            username: this.formModel.username,
            email: this.formModel.email,
            password: this.formModel.password
          };

          await axiosInstance.post('/users', request);

          this.$router.push('/login');
        } catch (error) {
          if (error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
        } finally {
          this.isLoading = false;
        }
      }
    });
  }

  goToLogin(){
    this.$router.push('/login');
  }
}
