<template>
  <div v-loading="isLoading">
    <div class="d-flex">
      <h3>Film</h3>
      <el-button
        class="ml-auto"
        style="height:35px line-height:35px"
        type="success"
        @click="addMovie()">Aggiungi Film</el-button>
    </div>

    <el-dialog title="Inserisci Film" :visible.sync="dialogVisible">
      <el-form :rules="formRules" ref="MovieForm" :model="formModelMovie">
        <el-form-item label="Immagine Url" prop="imageUrl" :label-width="formLabelWidth">
          <el-input v-model="formModelMovie.imageUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Titolo" prop="title" :label-width="formLabelWidth">
          <el-input v-model="formModelMovie.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Descrizione" prop="desc" :label-width="formLabelWidth">
          <el-input v-model="formModelMovie.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulla</el-button>
        <el-button type="success" @click="confirmMovie()">Conferma</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Movies.ts" />