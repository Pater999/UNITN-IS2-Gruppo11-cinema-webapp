<template>
  <CWrapper>
    <Header />
    <div>

      <div v-loading="isLoading">
        <el-row>
          <div
            style="
              float: left;
              margin-left: 1%;
              margin-bottom: 10px;
              margin-top: 30px;
            "
          >
          <h1>Film in programma</h1>
          </div>
          <div
            style="
              float: right;
              margin-right: 1%;
              margin-bottom: 10px;
              margin-top: 10px;
            "
          >
            <el-date-picker
              class="mt-4"
              lang="it"
              v-model="dateTimeSelected" 
              type="date"
              @change="dateChanged()"
            ></el-date-picker>
          </div>
        </el-row>
        <div v-for="movie in movies" :key="movie._id">
              <el-card style="width: 98%">
                <template>
                  <div style="width: 100%" class="content">
                    <img
                      class="mr-3 roundedFilm"
                      :src="movie.imageUrl"
                      width="12%"
                    />
                    <el-col :span="0.5" style="margin-left: 50px"> </el-col>
                    <el-col class="testo">
                      <el-row
                        ><span class="testo" style="font-size:18.0pt">{{
                          movie.title
                        }}</span></el-row
                      >
                      <div class="line"></div>
                      <el-row>
                        <span class="testo" style="font-size:12.0pt">{{
                          movie.desc
                        }}</span>
                      </el-row>
                    </el-col>

                    <el-col>
                      <el-row>
                        <el-button
                          class="orario"
                          circle
                          v-for="plan in movie.plans"
                          :key="`${plan.date}-${plan.room._id}`"
                        >
                          {{ new Date(plan.date).getHours() }}:{{
                            new Date(plan.date).getMinutes()
                          }}<div>{{ plan.room.name }}</div></el-button
                        >
                      </el-row>
                      <el-row>
                        <el-button
                          style="float: right; margin-top: 120px"
                          type="warning"
                          >PRENOTA ORA</el-button
                        >

                        
                        
                      </el-row>
                    </el-col>
                  </div>
                </template>
              </el-card>
        </div>
      </div>
    </div>
  </CWrapper>
</template>



<script lang="ts" src="./HomepageMovies.ts" />
<style lang="scss" src="./HomepageMovies.scss" />



