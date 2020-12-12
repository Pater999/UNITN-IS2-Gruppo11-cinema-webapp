<template>
  <CWrapper>
    <Header />
    <div class="container-fluid">
      <div class="row m-4">
        <div class="col">
          <el-tabs v-model="activeName">
            <el-tab-pane label="Tariffe" name="Fares"><Fares /></el-tab-pane>
            <el-tab-pane label="Sale" name="Rooms"><AdminRooms /></el-tab-pane>
            <el-tab-pane label="Film" name="Movies"><AdminMovies /></el-tab-pane>
            <el-tab-pane label="Utenti" name="Users"><AdminUsers /></el-tab-pane>
            <el-tab-pane label="Prenotazioni" name="Reservations"> <Reservations /></el-tab-pane>
            <el-tab-pane label="Comunicazioni" name="Comunications"> <Comunications /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </CWrapper>
</template>

<script lang="ts" src="./Dashboard.ts" />
<style scoped lang="scss" src="./Dashboard.scss" />
