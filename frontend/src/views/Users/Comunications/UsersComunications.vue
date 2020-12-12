<template>
  <CWrapper>
    <Header />
    <div class="container" style="padding: 3%">
      <div v-loading="isLoading">
        <div class="d-flex">
          <h3>Annunci</h3>
        </div>
        <template>
          <el-table :data="Comunications" style="width: 100%" class="mt-3">
            <el-table-column label="Titolo">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column label="Annuncio">
              <template slot-scope="scope">
                <el-button type="text" @click="openMsg(scope.row)">
                  Leggi annuncio
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="Data">
              <template slot-scope="scope"> {{ scope.row.date }} </template>
            </el-table-column>
            <el-table-column width="120px"> </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </CWrapper>
</template>

<script lang="ts" src="./UsersComunications.ts" />
