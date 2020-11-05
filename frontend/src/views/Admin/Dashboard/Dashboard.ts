import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AdminDashboard extends Vue {
  isLoading = false;

  async mounted() {
      // METTERE QUI LE CHIAMATE DA FARE DOPO CHE SI è caricata la pagina
  }

  logOut() {
    alert('TODO');
  }
}
