<template>
  <div v-loading="isLoading">
    <div class="d-flex mt-2">
      <div><h3>Prenotazioni</h3></div>
      <div class="ml-auto">
        <span>Filtra dal <el-date-picker class="ml-1" lang="it" v-model="dateFrom" type="date" @change="dateChanged()"/></span>
        <span class="ml-2">al <el-date-picker class="ml-1" lang="it" v-model="dateTo" type="date" @change="dateChanged()"/></span>
      </div>
    </div>
    <el-table :data="reservations" style="width: 100%" class="mt-3">
      <el-table-column label="Id prenotazione" width="200px">
        <template slot-scope="scope">
          {{ scope.row.reservationId }}
        </template>
      </el-table-column>
      <el-table-column label="Data e orario" width="150px">
        <template slot-scope="scope">
          {{ new Date(scope.row.date).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="Film">
        <template slot-scope="scope">
          {{ scope.row.movieTitle }}
        </template>
      </el-table-column>
      <el-table-column label="Utente">
        <template slot-scope="scope"> {{ scope.row.user.Name }} {{ scope.row.user.Surname }} </template>
      </el-table-column>
      <el-table-column label="Tariffa" width="120px">
        <template slot-scope="scope">
          {{ scope.row.fare.name }}
        </template>
      </el-table-column>
      <el-table-column label="Prezzo" width="80px">
        <template slot-scope="scope"> {{ scope.row.fare.price }}€ </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" src="./Reservations.ts" />
