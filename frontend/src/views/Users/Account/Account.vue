<template>
  <CWrapper>
    <Header />
    <div v-loading="isLoading">
      <center>
        <section class="container-fluid" style="margin-top: 5%;">
          <el-form :model="formModelAccount" style="width: 400px">
            <el-form-item label="Ruolo">
              <el-input :readonly="true" v-model="formModelAccount.Role"></el-input>
            </el-form-item>
            <el-form-item label="Nome" style="font-size:">
              <el-input :readonly="true" v-model="formModelAccount.Name"></el-input>
            </el-form-item>
            <el-form-item label="Cognome">
              <el-input :readonly="true" v-model="formModelAccount.Surname"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input :readonly="true" v-model="formModelAccount.Email"></el-input>
            </el-form-item>
            <el-form-item label="Username">
              <el-input :readonly="true" v-model="formModelAccount.Username"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="warning" @click="modifyPassword()">Modifica Password</el-button>
          </span>
        </section>
      </center>
    </div>

    <el-dialog v-loading="passwordLoading" title="Modifica Password" :visible.sync="dialogVisible">
      <el-form :rules="formRules" ref="PasswordForm" :model="formModifyPassword">
        <el-form-item label="Nuova Password" prop="nuovaPassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="formModifyPassword.nuovaPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="RipetiPassword" prop="nuovaPasswordCheck" :label-width="formLabelWidth">
          <el-input type="password" v-model="formModifyPassword.nuovaPasswordCheck" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulla</el-button>
        <el-button type="success" @click="confirmPasswordChange()">Conferma</el-button>
      </span>
    </el-dialog>
  </CWrapper>
</template>
<script lang="ts" src="./Account.ts" />
