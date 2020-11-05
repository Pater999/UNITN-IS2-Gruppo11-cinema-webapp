<template>
  <div class="container d-flex flex-column min-vh-100" v-loading="isLoading">
    <div class="row flex-grow-1 justify-content-center align-items-center">
      <el-card class="login">
        <div slot="header" class="text-center">
          <h2>Login ADMIN</h2>
        </div>
        <div>
          <el-form ref="loginForm" :model="formModel" :rules="formRules" @submit.native.prevent="submit()">
            <div class="mb-1">Username</div>
            <el-form-item prop="username">
              <el-input v-model="formModel.username"></el-input>
            </el-form-item>
            <div class="mt-3 mb-1">Password</div>
            <el-form-item prop="password">
              <el-input type="password" v-model="formModel.password"></el-input>
            </el-form-item>
            <div class="d-flex justify-content-end mt-3"><el-button type="primary" native-type="submit">Accedi</el-button></div>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" src="./Login.ts" />
<style lang="scss" src="./Login.scss" />
