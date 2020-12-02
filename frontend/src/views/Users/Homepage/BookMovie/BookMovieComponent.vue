<template>
  <el-dialog :visible.sync="dialogVisible">
    <div slot="title">
      <h1>
        Prenota - <strong>{{ movie.title }}</strong>
      </h1>
    </div>
    <div style="font-size: 24px;" v-loading="isLoading">
      <div><strong>Orario: </strong>{{ new Date(movie.plans[0].date).toLocaleString() }}</div>
      <div class="mb-5"><strong>Sala: </strong>{{ movie.plans[0].room.name }}</div>

      <div v-if="selectedFare">
        <strong class="mr-4">Tariffa</strong>
        <el-select v-model="selectedFare" placeholder="Select">
          <el-option v-for="fare in fares" :key="fare._id" :label="fare.name" :value="fare._id" />
        </el-select>
      </div>
      <div>
        <strong class="mr-4">Quantità</strong>
        <el-select v-model="numberOfTickets">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
        </el-select>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="isLoading" @click="dialogVisible = false">Annulla</el-button>
      <el-button type="success" :disabled="isLoading" @click="bookMovie">Conferma prenotazione</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts" src="./BookMovieComponent.ts" />

<style scoped>
.el-dialog__body {
  padding-top: 0px !important;
}
</style>
