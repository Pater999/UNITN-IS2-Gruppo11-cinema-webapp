<template>
  <div v-loading="isLoading">
    <div class="d-flex mb-3 mt-5">
      <h3>Programmazione Film</h3>
      <el-button
        class="ml-auto"
        style="height:35px line-height:35px"
        type="success"
        @click="addMovie()"
        >Aggiungi Film</el-button
      >
    </div>
    <el-collapse v-for="movie in movies" :key="movie._id">
      <el-collapse-item :name="movie.title">
        <template slot="title"
          ><div style="width:100%" class=" d-flex align-items-center">
            
            <img
              class="mr-3 roundedFilm"
              :src="movie.imageUrl"
              width="75px"
              height="75px"
              :alt="movie.title"
            />
            
            <h3>{{ movie.title }}</h3>
            <div class="ml-auto">
            <el-button class="mr-5" type="danger" @click.native.stop="deleteFilm(movie)">Elimina</el-button>
            </div>
          </div>
        </template>
        <div v-for="plan in movie.plans" :key="`${plan.date}-${plan.room._id}`">
          <h5>{{ plan.room.name }} - {{ printDate(new Date(plan.date)) }}</h5>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- First Step -->
    <el-dialog
      v-if="!isNextStep"
      title="Inserisci Film"
      :visible.sync="dialogVisible"
    >
      <el-form :rules="formRules" ref="MovieForm" :model="formModelMovie">
        <el-form-item
          label="Immagine Url"
          prop="imageUrl"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formModelMovie.imageUrl"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Titolo" prop="title" :label-width="formLabelWidth">
          <el-input
            v-model="formModelMovie.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Descrizione"
          prop="desc"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formModelMovie.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulla</el-button>
        <el-button type="success" @click="confirmMovie()">Avanti</el-button>
      </span>
    </el-dialog>

    <!-- Second Step -->
    <el-dialog
      v-else
      title="Imposta Programmazione"
      :visible.sync="dialogVisible"
    >
      <div class="block">
        <h1 class="Title">{{ formModelMovie.title }}</h1>
        <el-date-picker
          class="mt-4"
          v-model="formModelMovie.dateTimeSelected"
          type="datetime"
          placeholder="Seleziona data e ora"
          default-time="21:00:00"
        ></el-date-picker>
        <el-select
          class="ml-2"
          v-model="formModelMovie.selectedRoom"
          placeholder="Seleziona la sala"
        >
          <el-option
            v-for="item in formModelMovie.rooms"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <el-button type="primary" class="ml-4" @click="addMovieDate()"
          >Aggiungi</el-button
        >

        <div
          v-for="item in formModelMovie.dateTimesList"
          :key="`${item.date}-${item.roomId}`"
        >
          <el-card class="box-card mt-3 mb-3">
            <div class="d-flex align-items-center">
              <div class="">{{ printMovieDate(item) }}</div>
              <el-button
                type="danger"
                class="ml-auto"
                @click="deleteMovieDate(item)"
                >Elimina</el-button
              >
            </div>
          </el-card>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulla</el-button>
        <el-button type="success" @click="confirmMovie()">Conferma</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Movies.ts" />
<style lang="scss" src="./Movies.scss" />