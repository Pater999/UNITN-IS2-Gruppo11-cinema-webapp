import axiosInstance from "@/axios-instance";
import { RoomDTO } from "@/Models/RoomDTO";
import { Form } from "element-ui";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminRooms extends Vue {
  isLoading = false;

  isUpdate = false;

  dialogVisible = false;

  Rooms: RoomDTO[] = [];

  formLabelWidth = "100px";

  formModelRoom = {
    name: "",
    id: 0
  };


  showTitle(){
    if (this.isUpdate) {
      return "Modifica Sala";
    } else {
      return "Aggiungi Sala";
    }
  }

  async mounted() {
    await this.getRooms();
  }

  async deleteRoom(row: RoomDTO) {
    this.isLoading = true;
    try {
      const response = await axiosInstance.delete(`/rooms/${row.Id}`);
      this.$message.success(response.data.message);
      await this.getRooms();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async modifyRoom(row: RoomDTO) {
    this.formModelRoom.name = row.Name;
    this.formModelRoom.id = row.Id;
    this.isUpdate = true;
    this.dialogVisible = true;
  }

  async getRooms() {
    this.isLoading = true;
    try {
      const response = await axiosInstance.get("/rooms");
      this.Rooms = response.data as RoomDTO[];
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        this.$message.error(error.response.data.error);
    } finally {
      this.isLoading = false;
    }
  }

  async addRoom() {
    this.dialogVisible = true;
    this.isUpdate = false;
  }

  get formRules() {
    const required = {
      required: true,
      message: "Campo obbligatorio",
    };

    return {
      name: required,
    };
  }

  async confirmRoom() {
    const $form = this.$refs.RoomForm as Form;

    $form.validate(async (isValid) => {
      if (isValid) {
        this.isLoading = true;
        try {
          await axiosInstance.post("/rooms", this.formModelRoom);
          this.$message.success("Sala aggiunta con successo!");
          await this.getRooms();
        } catch (error) {
          if (error.response.data && error.response.data.error)
            this.$message.error(error.response.data.error);
        } finally {
          $form.resetFields();

          this.isLoading = false;
          this.dialogVisible = false;
        }
      }
    });
  }

  async confirmModifiedRoom() {
    const $form = this.$refs.RoomForm as Form;

    $form.validate(async (isValid) => {
      if (isValid) {
        this.isLoading = true;
        try {
          await axiosInstance.put(`/rooms/${this.formModelRoom.id}`, {name: this.formModelRoom.name});
          this.$message.success("Sala modificata con successo!");
          await this.getRooms();
        } catch (error) {
          if (error.response.data && error.response.data.error)
            this.$message.error(error.response.data.error);
        } finally {
          $form.resetFields();

          this.isLoading = false;
          this.dialogVisible = false;
        }
      }
    });
  }

  async roomMap(row: RoomDTO) {
    //TODO
    console.log(row);
  }
}
