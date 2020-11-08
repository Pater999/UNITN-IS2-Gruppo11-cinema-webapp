import { Component, Vue } from 'vue-property-decorator';
import { FareDto } from "@/Models/FareDto";
import axiosInstance from '@/axios-instance';
import { Form } from 'element-ui';

@Component
export default class AdminDashboard extends Vue {

  isLoading = false;

  dialogVisible = false;

  Fares: FareDto[] = [];

  formLabelWidth = "100px";

  formModelFare = {
    name: "",
    desc: "",
    price: 0.0
  };

  async mounted() {
    await this.getFares();
  }

  logOut() {
    this.$router.replace('/admin/login');
  }

  async deleteFare(row: FareDto)
  {
    this.isLoading = true;
    try 
    {
      const response = await axiosInstance.delete(`/admin/Fares/${row.Id}`);
      this.$message.success(response.data.message);
      await this.getFares();  
    }
    catch (error) 
    {
      if (error.response && error.response.data && error.response.data.error) 
        this.$message.error(error.response.data.error);
    } 
    finally 
    {
      this.isLoading = false;
    }
  }

  async getFares()
  {
    this.isLoading = true;
    try 
    {
      const response = await axiosInstance.get("/admin/Fares");
      this.Fares = response.data as FareDto[];
    }
    catch (error) 
    {
      if (error.response && error.response.data && error.response.data.error) 
        this.$message.error(error.response.data.error);
    } 
    finally 
    {
      this.isLoading = false;
    }
  }

  showPrice(price: number): string
  {
    return price.toFixed(2);
  }

  async addFare()
  {
    this.dialogVisible = true;
  }

  get formRules() {
    const required = {
      required: true,
      message: 'Campo obbligatorio'
    };

    return {
      name: required,
      desc: required,
      price: required
    };
  }

  async confirmFare()
  {
    const $form = this.$refs.FareForm as Form;

    $form.validate(async (isValid) => {
      if (isValid) {
        this.isLoading = true;
        try {
          await axiosInstance.post('/admin/fares', this.formModelFare);
          this.$message.success("Tariffa aggiunta con successo!");
          await this.getFares(); 

        } catch (error) {
          if (error.response.data && error.response.data.error) this.$message.error(error.response.data.error);
        } finally {
          $form.resetFields();
          
          this.isLoading = false;
          this.dialogVisible = false;
        }
      }
    });
  }
}
