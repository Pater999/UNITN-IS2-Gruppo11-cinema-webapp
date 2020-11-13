<template>
  <div id="t">
    <section class="container-fluid">
      <div class="row justify-content-right">
        <div id="aaa" class="col-lg-4">
          <div class="login-panel bg-black text-left">
            <h1 id="bianco" class="display-3 font-weight-bold">SmartCinema</h1>
            <p id="bianco" class="font-weight-bold">Benvenuto!</p>
            <br />
             <el-form ref="loginForm" :model="formModel" :rules="formRules" @submit.native.prevent="submit()">
            <div  id="bianco" class="mb-1">Username</div>
            <el-form-item prop="username">
              <el-input v-model="formModel.username"></el-input>
            </el-form-item>
            <div  id="bianco" class="mt-3 mb-1">Password</div>
            <el-form-item prop="password">
              <el-input type="password" v-model="formModel.password"></el-input>
            </el-form-item>
            <div class="d-flex justify-content-end mt-3"><el-button type="warning" native-type="submit">Accedi</el-button></div>
          </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" src="./UserLogin.ts"/>
<style lang="scss" src="./UserLogin.scss"/>

