<template>
  <div v-loading="isLoading">
    <div class="d-flex mt-2">
      <h3>Tariffe</h3>
      <el-button
        class="ml-auto"
        style="height:35px line-height:35px"
        type="success"
        @click="addFare()"
        >Aggiungi Tariffa</el-button
      >
    </div>
    <template>
      <el-table :data="Fares" style="width: 100%" class="mt-3">
        <el-table-column label="Nome">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Descrizione">
          <template slot-scope="scope">
            {{ scope.row.desc }}
          </template>
        </el-table-column>
        <el-table-column label="Prezzo">
          <template slot-scope="scope">
            {{ showPrice(scope.row.price) }}€
          </template>
        </el-table-column>
        <el-table-column width="120px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteFare(scope.row)"
              >Elimina</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="Inserisci Tariffa" :visible.sync="dialogVisible">
      <el-form :rules="formRules" ref="FareForm" :model="formModelFare">
        <el-form-item label="Nome" prop="name" :label-width="formLabelWidth">
          <el-input v-model="formModelFare.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Descrizione" prop="desc" :label-width="formLabelWidth">
          <el-input v-model="formModelFare.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Prezzo" prop="price" :label-width="formLabelWidth">
          <el-input-number style="width:100%" v-model="formModelFare.price" :precision="2" :step="0.1" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulla</el-button>
        <el-button type="success" @click="confirmFare()"
          >Conferma</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Fares.ts" />