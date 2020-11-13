import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { LOGOUT } from '@/store/types/actions-types';

@Component({
  computed: {
    ...mapState(['username'])
  }
})
export default class Header extends Vue {
  username!: string;

  logOut() {
    this.$store.dispatch(LOGOUT);
    this.$router.replace('/admin/login');
  }
}
