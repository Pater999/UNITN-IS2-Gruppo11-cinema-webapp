<template>
  <section id="bg" class="container-fluid">
    <div id="icon" class="row align-items-end">
      <img class="img" src="@/assets/login_bg.png" />
    </div>
    <div id="lform" class="row text-center align-items-start">
      <div class="login-panel bg-black text-left">
        <h1 id="title" class="display-3 font-weight-bold white">SmartCinema</h1>
        <br />

        <el-form
          id="form"
          ref="loginForm"
          :model="formModel"
          :rules="formRules"
          @submit.native.prevent="submit()"
        >
          <div class="mb-1 white">Username</div>
          <el-form-item prop="username">
            <el-input v-model="formModel.username"></el-input>
          </el-form-item>
          <div class="mt-3 mb-1 white">Password</div>
          <el-form-item prop="password">
            <el-input type="password" v-model="formModel.password"></el-input>
          </el-form-item>

          <div>
            <span class="font-weight-bold white">Non hai un account?</span>
            <span class="ml-2" @click="goToRegister" style="color: #2d31ff; cursor:pointer;"
              >Registrati</span
            >
          </div>

          <div class="d-flex justify-content-end mt-3">
            <el-button type="primary" native-type="submit">Accedi</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script lang="ts" src="./UserLogin.ts" />
<style lang="scss" src="./UserLogin.scss" />
