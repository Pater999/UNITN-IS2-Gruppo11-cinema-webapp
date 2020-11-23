<template>
    <section id="bg" class="container-fluid">
      <div class="row" style="margin-top: 10em;">
        <div class="col">
          <div class="login-panel bg-black text-left">
            <h1 class="display-3 font-weight-bold white">SmartCinema</h1>
            <br />
            <el-form id="form" ref="registerForm" :model="formModel" :rules="formRules" @submit.native.prevent="submit()">

              <div class="mb-1 white">Nome</div>
              <el-form-item prop="name">
                <el-input v-model="formModel.name"></el-input>
              </el-form-item>

              <div class="mb-1 white">Cognome</div>
              <el-form-item prop="surname">
                <el-input v-model="formModel.surname"></el-input>
              </el-form-item>

              <div class="mb-1 white">Username</div>
              <el-form-item prop="username">
                <el-input v-model="formModel.username"></el-input>
              </el-form-item>


              <div class="mb-1 white">E-mail</div>
              <el-form-item prop="email">
                <el-input v-model="formModel.email"></el-input>
              </el-form-item>

              <div class="mt-3 mb-1 white">Password</div>
              <el-form-item prop="password">
                <el-input type="password" v-model="formModel.password"></el-input>
              </el-form-item>

              <div>
                <span class="font-weight-bold white">Hai già un account?</span>
                <span class="ml-2" @click="goToLogin" style="color: #2d31ff; cursor:pointer;">Login</span>
              </div>
              <div class="d-flex justify-content-end mt-3"><el-button type="primary" native-type="submit">Registrati</el-button></div>
            </el-form>
          </div>
        </div>
      </div>
    </section>
</template>
<script lang="ts" src="./UserRegister.ts" />
<style lang="scss" src="./UserRegister.scss" />
