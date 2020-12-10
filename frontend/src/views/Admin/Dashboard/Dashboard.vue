<template>
  <CWrapper>
    <Header />
    <div class="container-fluid">
      <div class="row m-4">
        <div class="col-md-6"><Fares /></div>
        <div class="col-md-6"><AdminRooms /></div>
        <div class="col-md-6"><AdminMovies /></div>
        <div class="col-md-6"><AdminUsers /></div>
      </div>
    </div>
  </CWrapper>
</template>

<script lang="ts" src="./Dashboard.ts" />
<style scoped lang="scss" src="./Dashboard.scss" />
