import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  logOut() {
    this.$router.replace('/admin/login');
  }
}
