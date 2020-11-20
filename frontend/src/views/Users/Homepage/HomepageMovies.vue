<template>
  <CWrapper>
    <Header />
    <div v-loading="isLoading" class="container mt-3">
      <el-date-picker
        class="mt-4"
        lang="it"
        v-model="dateTimeSelected"
        type="date"
        @change="dateChanged()"
      ></el-date-picker>

      <div v-for="movie in movies" :key="movie.Id">
        <div class="card">
          <div class="row align-items-center">
            <div class="col-md-3">
              <img :src="movie.imageUrl" class="img-fluid" width="75%" />
            </div>
            <div class="col-md-8">
              <h2 class="card-title mt-2">
                {{ movie.title }}
                <hr />
              </h2>
              <p>{{ movie.desc }}</p>
            </div>

            <div class="col">
              <el-button
                class="orario"
                circle
                v-for="plan in movie.plans"
                :key="`${plan.Date}-${plan.room._id}`"
              >
                {{ new Date(plan.date).getHours() }}:{{ new Date(plan.date).getMinutes() }} <br />
                {{ plan.room.name }}
              </el-button>
              <el-button class="prenota" type="primary">PRENOTA ORA</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CWrapper>
</template>

<script lang="ts" src="./HomepageMovies.ts" />
<style lang="scss" src="./HomepageMovies.scss" />
