<template>
  <div v-loading="isLoading">
    <div class="d-flex">
      <h3>Sale</h3>
      <el-button
        class="ml-auto"
        style="height:35px line-height:35px"
        type="success"
        @click="addRoom()"
        >Aggiungi Sala</el-button
      >
    </div>
    <template>
      <el-table :data="Rooms" style="width: 100%">
        <el-table-column label="Nome">
          <template slot-scope="scope">
            {{ scope.row.Name }}
          </template>
        </el-table-column>
        <el-table-column label="Posti">
          <template slot-scope="scope">
            {{ scope.row.Seats }}
          </template>
        </el-table-column>

        <el-table-column label="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="roomMap(scope.row)"
              >Mappa posti</el-button
            >
            <el-button size="mini" type="warning" @click="modifyRoom(scope.row)"
              >Modifica</el-button
            >
            <el-button size="mini" type="danger" @click="deleteRoom(scope.row)"
              >Elimina</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog :title="showTitle()" :visible.sync="dialogVisible">
      <el-form :rules="formRules" ref="RoomForm" :model="formModelRoom">
        <el-form-item label="Nome" prop="name" :label-width="formLabelWidth">
          <el-input v-model="formModelRoom.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulla</el-button>
        <el-button v-if="isUpdate" type="success" @click="confirmModifiedRoom()">Modifica</el-button>
        <el-button v-else type="success" @click="confirmRoom()">Conferma</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts" src="./Rooms.ts" />
