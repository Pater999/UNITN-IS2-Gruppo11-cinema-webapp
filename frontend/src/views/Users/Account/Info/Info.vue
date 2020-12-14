<template>
  <div v-loading="isLoading">
    <el-table :data="accountInfo" style="width: 100%" class="mt-3">
      <el-table-column label="I tuoi Dati">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" src="./Info.ts" />
