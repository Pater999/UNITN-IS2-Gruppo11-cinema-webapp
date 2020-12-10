import axiosInstance from '@/axios-instance';
import { userDTO } from '@/Models/UserDTO';
import { Form } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AdminFares extends Vue {
  isLoading = false;

  dialogVisible = false;

  Users: userDTO[] = [];

  async mounted() {
    await this.getUsers();
  }

  logOut() {
    this.$router.replace('/login');
  }

  async getUsers() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get('/Users');
      this.Users = response.data as userDTO[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  modifyUserRole(row: userDTO) {
    //TODO - Storia #30
    console.log(row)
  }


}
