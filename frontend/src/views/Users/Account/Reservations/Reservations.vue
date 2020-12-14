<template>
  <div v-loading="isLoading">
    <h3 class="mt-2">Prenotazioni</h3>
    <el-table :data="reservations" style="width: 100%" class="mt-3">
      <el-table-column label="Data e Orario">
        <template slot-scope="scope">
          {{ new Date(scope.row.date).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="Film">
        <template slot-scope="scope">
          {{ scope.row.movieTitle }}
        </template>
      </el-table-column>
      <el-table-column label="Tariffa">
        <template slot-scope="scope">
          {{ scope.row.fare.name }}
        </template>
      </el-table-column>
      <el-table-column label="Prezzo">
        <template slot-scope="scope"> {{ scope.row.fare.price }}€ </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" src="./Reservations.ts" />
