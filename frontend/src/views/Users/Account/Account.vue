<template>
  <CWrapper>
    <Header />
    <div class="container-fluid">
      <div class="row m-4">
        <div class="col">
          <el-tabs v-model="activeName">
            <el-tab-pane label="Account" name="Account">
              <div class="d-flex">
                <h3 class="mt-2">Account</h3>
                <el-button class="ml-auto" style="height:35px line-height:35px" type="warning" @click="modifyPassword()">Modifica Password</el-button>
              </div>
              <AccountInfo />
            </el-tab-pane>
            <el-tab-pane label="Prenotazioni" name="Prenotazioni">
              <AccountReservations />
            </el-tab-pane>
          </el-tabs>

          <el-dialog v-loading="passwordLoading" title="Modifica Password" :visible.sync="dialogVisible">
            <el-form :rules="formRules" ref="PasswordForm" :model="formModifyPassword">
              <el-form-item label="Nuova Password" prop="nuovaPassword">
                <el-input type="password" v-model="formModifyPassword.nuovaPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Ripeti Password" prop="nuovaPasswordCheck">
                <el-input type="password" v-model="formModifyPassword.nuovaPasswordCheck" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">Annulla</el-button>
              <el-button type="success" @click="confirmPasswordChange()">Conferma</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </CWrapper>
</template>
<script lang="ts" src="./Account.ts" />
