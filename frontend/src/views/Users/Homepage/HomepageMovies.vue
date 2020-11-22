<template>
  <CWrapper>
    <Header />
    <div v-loading="isLoading" class="container">
      <div id="c" class=" d-flex flex-row-reverse align-items-start">
        <el-date-picker
          class="mt-4"
          lang="it"
          v-model="dateTimeSelected"
          type="date"
          @change="dateChanged()"
        ></el-date-picker>
      </div>

      <div v-for="movie in movies" :key="movie.Id">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-2 ">
              <img  :src="movie.imageUrl" height="100%" class="card-img" />
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
              <div id="p" class=" h-75 d-flex flex-row-reverse align-items-start">
                <el-button
                  class="orario"
                  circle
                  v-for="plan in movie.plans"
                  :key="`${plan.Date}-${plan.room._id}`"
                >
                  {{ new Date(plan.date).getHours() }}:{{ new Date(plan.date).getMinutes() }}
                  <br />
                  {{ plan.room.name }}
                </el-button>
              </div>

              <div id="p" class="h-25 d-flex flex-row-reverse align-items-end">
                <el-button type="primary">PRENOTA ORA</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CWrapper>
</template>

<script lang="ts" src="./HomepageMovies.ts" />
<style lang="scss" src="./HomepageMovies.scss" />
