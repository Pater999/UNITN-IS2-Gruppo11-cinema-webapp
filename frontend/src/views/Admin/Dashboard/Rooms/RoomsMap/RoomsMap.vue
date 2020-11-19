<template>
  <CWrapper>
    <Header />
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col">
          <el-card class="box-card" v-loading="isLoading">
            <div slot="header" class="clearfix">
              <h3>Mappa posti</h3>
            </div>
            <div class="mb-3 text-center">
              <div v-for="(row, indice) in rows" :key="`row-${indice}`" class="mt-3">
                <span v-for="index in row" :key="`row-${index}`" class="mr-2">
                  <el-popover placement="top-start" :title="`Fila ${indice+1}`" width="200" trigger="hover" :content="`Posto ${index}`">
                    <font-awesome-icon slot="reference" icon="couch" style="color: brown" size="lg" />
                  </el-popover>
                </span>
              </div>
              <el-form :inline="true" :model="formModel" class="mt-4">
                <el-form-item>
                  <el-input-number size="mini" v-model="formModel.seatsNumber" placeholder="Posti" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" size="mini" @click="addRow">Aggiungi fila</el-button>
                </el-form-item>
              </el-form>
              <div class="d-flex">
                <div><el-button size="large" type="primary" @click="goBack()">Indietro</el-button></div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </CWrapper>
</template>

<script lang="ts" src="./RoomsMap.ts" />
<style lang="scss" src="./RoomsMap.scss" />
