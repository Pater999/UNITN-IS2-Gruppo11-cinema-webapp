<template>
  <div v-loading="isLoading">
    <div class="d-flex">
      <h3>Annunci</h3>
      <el-button
        class="ml-auto"
        style="height:35px line-height:35px"
        type="success"
        @click="addComunication()"
        >Aggiungi Annuncio</el-button
      >
    </div>
    <template>
      <el-table :data="Comunications" style="width: 100%" class="mt-3">
        <el-table-column label="Titolo">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Annuncio">
          <template slot-scope="scope">
            {{ scope.row.desc }}
          </template>
        </el-table-column>
        <el-table-column label="Data">
          <template slot-scope="scope"> {{ scope.row.date }} </template>
        </el-table-column>
        <el-table-column width="120px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteComunication(scope.row)">Elimina</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="Inserisci Annuncio" :visible.sync="dialogVisible">
      <el-form :rules="formRules" ref="formModelComunication" :model="formModelComunication">
        <el-form-item label="Titolo" prop="title" :label-width="formLabelWidth">
          <el-input v-model="formModelComunication.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Annuncio" prop="desc" :label-width="formLabelWidth">
          <el-input v-model="formModelComunication.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Data" prop="date" :label-width="formLabelWidth">
          <el-input v-model="formModelComunication.date" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulla</el-button>
        <el-button type="success" @click="confirmComunication()">Conferma</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Comunications.ts" />
