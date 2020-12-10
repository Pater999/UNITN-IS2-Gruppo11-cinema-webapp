<template>
  <div v-loading="isLoading">
    <div class="d-flex mb-3 mt-5">
      <h3>Users</h3>
    </div>
    <template>
      <el-table :data="Users" style="width: 100%" class="mt-3">
        <el-table-column label="Username">
          <template slot-scope="scope">
            {{ scope.row.Username }}
          </template>
        </el-table-column>
        <el-table-column label="Email">
          <template slot-scope="scope">
            {{ scope.row.Email }}
          </template>
        </el-table-column>
        <el-table-column label="Ruolo">
          <template slot-scope="scope">
            {{ scope.row.Role }}
          </template>
        </el-table-column>
        <el-table-column width="120px">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="modifyUserRole(scope.row)">Modifica</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- TODO - Storia #30 -->
    <!-- <el-dialog :title="showTitle()" :visible.sync="dialogVisible">
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
    </el-dialog> -->

  </div>
</template>

<script lang="ts" src="./Users.ts" />