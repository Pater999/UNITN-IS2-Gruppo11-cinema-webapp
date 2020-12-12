<template>
  <CWrapper>
    <Header />
    <div v-loading="isLoading" class="container">
      <div class=" d-flex mt-4 mb-4">
        <h3>Programmazione per il giorno {{ new Date(dateTimeSelected).toLocaleDateString() }}</h3>
        <div class="ml-auto">
          <el-button class="mr-1" icon="el-icon-back" @click="changeDate(1)" />
          <el-date-picker class="mr-1" lang="it" v-model="dateTimeSelected" type="date" @change="dateChanged()" />
          <el-button icon="el-icon-right" @click="changeDate(2)" />
        </div>
      </div>

      <el-alert v-if="!areThereMovies" type="info" center show-icon :closable="false">
        <div slot="title"><h3>NESSUN FILM TROVATO!</h3></div>
        <strong>Nessun film disponibile in questa data. Prova un altra data!</strong>
      </el-alert>

      <div v-for="movie in movies" :key="movie._id">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-2 ">
              <img :src="movie.imageUrl" height="100%" class="card-img" />
            </div>
            <div class="col-md-8 my-auto">
              <div class="card-body">
                <h2 class="card-title">{{ movie.title }}</h2>
                <hr />
                <p class="card-text text-justify">
                  {{ movie.desc }}
                </p>
              </div>
            </div>

            <div class="col-md-2">
              <el-radio-group v-model="selectedPlan" id="p" class=" h-75 d-flex flex-row-reverse align-items-start">
                <el-radio-button class="mr-2" v-for="plan in movie.plans" :key="`${plan._id}-${plan.room._id}`" :disabled="isButtonDisabled" :label="movie._id + '-' + plan._id">
                  {{ ('0' + new Date(plan.date).getHours()).slice(-2) }}:{{ ('0' + new Date(plan.date).getMinutes()).slice(-2) }}
                  <br />
                  {{ plan.room.name }}</el-radio-button
                >
              </el-radio-group>

              <div id="p" class="h-25 d-flex flex-row-reverse align-items-end">
                <el-button :disabled="isButtonDisabled" @click="bookMovie" type="primary">PRENOTA ORA</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BookMovieComponent v-if="selectedMovie" :dialogIsVisible.sync="bookingDialogVisible" :movie="selectedMovie" />
  </CWrapper>
</template>

<script lang="ts" src="./HomepageMovies.ts" />
<style scoped lang="scss" src="./HomepageMovies.scss" />
