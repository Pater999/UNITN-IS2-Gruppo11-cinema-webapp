<template>
  <div v-loading="isLoading">
    <div class="d-flex mt-2">
      <h3>Utenti</h3>
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
        <el-table-column label="Ruolo" width="200px">
          <template slot-scope="scope">
            <el-switch :value="scope.row.Role == 'admin'" @change="modifyUserRole(scope.row)" active-text="Admin" inactive-text="Utente"> </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script lang="ts" src="./Users.ts" />
