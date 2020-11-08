<template>
  <div>
    <el-menu mode="horizontal" background-color="#def2f1" class="d-flex">
      <el-menu-item index="1">SmartCinema</el-menu-item>

      <el-submenu index="2" class="ml-auto mr-2 mr-md-4">
        <template slot="title">Admin</template>
        <el-menu-item @click="logOut">Logout</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="mx-5 mt-4" v-loading="isLoading">
      <div class="d-flex">
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
        <el-table :data="Fares" style="width: 100%">
          <el-table-column label="Name" width="180">
            <template slot-scope="scope">
              {{ scope.row.Name }}
            </template>
          </el-table-column>
          <el-table-column label="Description" width="300">
            <template slot-scope="scope">
              {{ scope.row.Desc }}
            </template>
          </el-table-column>
          <el-table-column label="Price" width="180">
            <template slot-scope="scope">
              {{ showPrice(scope.row.Price) }}€
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteFare(scope.row)"
                >Elimina</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <h3>Programmazione</h3>
      <h3>Menu</h3>
    </div>

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

<script lang="ts" src="./Dashboard.ts" />
<style lang="scss" src="./Dashboard.scss" />
