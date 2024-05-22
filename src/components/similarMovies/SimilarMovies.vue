<template>
<div class="movies-aside">
  <div class="movies-aside__movies" v-for="movie in allMovies" :key="movie.nameEn">
    <router-link :to="'/catalog/'+ movie.type + '/movie/' + movie.id" @click="onScrollToTop">
      <div class="movies-aside__image">
        <img :src="'/img/films/' + movie.imgSm" alt="movie-image" >
      </div>
      <div class="movies-aside__title">
        <p>{{ locale === 'en' ? movie.nameEn : movie.nameRu }}</p>
      </div>
    </router-link>
  </div>
</div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {T_CategoryType, T_MovieType} from "../../../models/server/films/types.ts";
import {sortSimilarMovies} from "./utils/sortSimilarMovies.ts";
import {T_AllMoviesTypes} from "../moviesArticle/models/types.ts";
import {useI18n} from "vue-i18n";

const props = defineProps<{
  categories: T_CategoryType[],
  type: T_MovieType
}>()
const {locale} = useI18n({ useScope: 'global'})

const allMovies = computed<T_AllMoviesTypes[]>(() => sortSimilarMovies(props.categories, props.type))

function onScrollToTop() {
  setTimeout(() => {
    scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, 1000)
}
</script>

<style scoped>
.movies-aside {
  display: flex;
  width: 100%;
}
.movies-aside__movies {
  border: 1px solid #838383;
  border-radius: 5px;
  padding: 4px;
  margin: 5px;
  width: 100%;
}
.movies-aside__movies:hover .movies-aside__title p{
  text-decoration: underline;
}
.movies-aside__movies:hover {
  opacity: 0.8;
}

.movies-aside__image img {
  max-width: 100%;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}
.movies-aside__title p {
  font-family: sans-serif;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .similar-movies-aside__movies-box {
    width: 90vw;
  }
  .movies-aside {
    flex-wrap: wrap;
  }
  .movies-aside__movies {
    width: 20vw;
  }
}
@media (max-width: 425px) {
  .similar-movies-aside__movies-box {
    width: 95vw;
  }
  .movies-aside__movies {
    width: 27vw;
  }
}
</style>