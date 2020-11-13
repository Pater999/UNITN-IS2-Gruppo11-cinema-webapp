<template>
  <CWrapper>
    <Header />
    <div>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#b96d22"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">SmartCinema</el-menu-item>
      </el-menu>

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
              v-model="formModelMovie.dateTimeSelected" 
              type="date"
            ></el-date-picker>
          </div>
        </el-row>
        <div v-for="movie in movies" :key="movie.Id">
          <div
            v-for="plan in movie.Plans"
            :key="`${plan.Date}-${plan.Room.Id}`"
          >
            <div v-if="new Date(plan.Date) >= formModelMovie.dateTimeSelected">
              <el-card style="width: 98%">
                <template>
                  <div style="width: 100%" class="content">
                    <img
                      class="mr-3 roundedFilm"
                      :src="movie.ImageUrl"
                      width="12%"
                    />
                    <el-col :span="0.5" style="margin-left: 50px"> </el-col>
                    <el-col class="testo">
                      <el-row
                        ><SPAN class="testo" STYLE="font-size:18.0pt">{{
                          movie.Title
                        }}</SPAN></el-row
                      >
                      <div class="line"></div>
                      <el-row>
                        <SPAN class="testo" STYLE="font-size:12.0pt">{{
                          movie.Desc
                        }}</SPAN>
                      </el-row>
                    </el-col>

                    <el-col>
                      <el-row>
                        <el-button
                          class="orario"
                          circle
                          v-for="plan in movie.Plans"
                          :key="`${plan.Date}-${plan.Room.Id}`"
                        >
                          {{ printDate(new Date(plan.Date).getHours()) }}-{{
                            printDate(new Date(plan.Date).getMinutes())
                          }}</el-button
                        >
                      </el-row>
                      <el-row>
                        <el-button
                          style="float: right; margin-top: 120px"
                          type="warning"
                          >PRENOTA ORA</el-button
                        >

                        <el-tag STYLE="font-size:13.0pt; margin-right: 50px; float: right; margin-top: 125px" type="primary">{{ printDate(new Date(plan.Date).getDay()) }}/{{
                            printDate(new Date(plan.Date).getMonth())
                          }}/{{ new Date().getFullYear() }}</el-tag>
                        
                      </el-row>
                    </el-col>
                  </div>
                </template>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CWrapper>
</template>



<script lang="ts" src="./HomepageMovies.ts" />
<style lang="scss" src="./HomepageMovies.scss" />



