import axiosInstance from '@/axios-instance';
import { userDTO } from '@/Models/UserDTO';
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
      const response = await axiosInstance.get('/users');
      this.Users = response.data as userDTO[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async modifyUserRole(row: userDTO) {
    this.isLoading = true;
    try {
      await axiosInstance.put(`/users/${row._id}/change-role`, {role: row.Role == 'admin' ? 'User' : 'admin'});
      console.log(row.Role === 'admin' ? 'User' : 'admin')
      this.getUsers();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }
}
