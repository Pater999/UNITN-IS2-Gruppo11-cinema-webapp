import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { LOGOUT } from '@/store/types/actions-types';

@Component({
  computed: {
    ...mapState(['username', 'isAuthenticated', 'role'])
  }
})
export default class Header extends Vue {
  username!: string;
  isAuthenticated!: boolean;
  role!: string;

  logOut() {
    const r = this.role;
    this.$store.dispatch(LOGOUT);
    if (r === 'admin') this.$router.replace('/login');
    else this.$router.replace('/login');
  }

  logIn() {
    this.$router.push('/login');
  }

  goToAdminDashboard() {
    this.$router.push('/admin/dashboard');
  }
}
