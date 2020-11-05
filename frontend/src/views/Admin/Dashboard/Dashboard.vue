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
      <h3>Tariffe</h3>
      <!-- inserire qui tabella tariffe -->
      <h3>Programmazione</h3>
      <h3>Menu</h3>
    </div>
  </div>
</template>

<script lang="ts" src="./Dashboard.ts" />
<style lang="scss" src="./Dashboard.scss" />
