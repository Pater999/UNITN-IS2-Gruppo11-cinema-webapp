<template>
  <section id="bg" class="container-fluid">
    <div id="icon" class="row align-items-end">
      <img class="img" src="@/assets/login_bg.png" />
    </div>
    <div id="lform" class="row text-center align-items-start">
      <div class="login-panel bg-black text-left">
        <h2 id="title" class="text-center font-weight-bold white">SmartCinema</h2>
        <br />
        <el-form
          id="form"
          ref="registerForm"
          :model="formModel"
          :rules="formRules"
          @submit.native.prevent="submit()"
        >
          <div class="row">
            <div class="col-md-6">
              <div class="mb-1 white">Nome</div>
              <el-form-item prop="name">
                <el-input v-model="formModel.name"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-6">
              <div class="mb-1 white">Cognome</div>
              <el-form-item prop="surname">
                <el-input v-model="formModel.surname"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="mb-1 white">E-mail</div>
          <el-form-item prop="email">
            <el-input v-model="formModel.email"></el-input>
          </el-form-item>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-1 white">Username</div>
              <el-form-item prop="username">
                <el-input v-model="formModel.username"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-6">
              <div class="mb-1 white">Password</div>
              <el-form-item prop="password">
                <el-input type="password" v-model="formModel.password"></el-input>
              </el-form-item>
            </div>
          </div>

          <div>
            <span class="font-weight-bold white">Hai già un account?</span>
            <span class="ml-2" @click="goToLogin" style="color: #2d31ff; cursor:pointer;"
              >Login</span
            >
          </div>
          <div class="d-flex justify-content-end mt-3">
            <el-button type="primary" native-type="submit">Registrati</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script lang="ts" src="./UserRegister.ts" />
<style lang="scss" src="./UserRegister.scss" />
