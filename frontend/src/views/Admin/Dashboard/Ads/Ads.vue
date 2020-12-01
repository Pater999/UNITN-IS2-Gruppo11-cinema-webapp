<template>
  <div v-loading="isLoading">
    <div class="d-flex">
      <h3>Annunci</h3>
      <el-button
        class="ml-auto"
        style="height:35px line-height:35px"
        type="success"
        @click="addAd()"
        >Aggiungi Annuncio</el-button
      >
    </div>
    <template>
      <el-table :data="Ads" style="width: 100%" class="mt-3">
        <el-table-column label="Titolo">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Annuncio">
          <template slot-scope="scope">
            {{ scope.row.ad }}
          </template>
        </el-table-column>
        <el-table-column label="Data">
          <template slot-scope="scope"> {{ scope.row.date }} </template>
        </el-table-column>
        <el-table-column width="120px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteAd(scope.row)">Elimina</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="Inserisci Annuncio" :visible.sync="dialogVisible">
      <el-form :rules="formRules" ref="formModelAd" :model="formModelAd">
        <el-form-item label="Titolo" prop="title" :label-width="formLabelWidth">
          <el-input v-model="formModelAd.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Annuncio" prop="ad" :label-width="formLabelWidth">
          <el-input v-model="formModelAd.ad" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Data" prop="date" :label-width="formLabelWidth">
          <el-input v-model="formModelAd.date" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulla</el-button>
        <el-button type="success" @click="confirmAd()">Conferma</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Ads.ts" />
