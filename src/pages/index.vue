<template>
  <div class="home-content">
    <div class="home-content__title-box">
      <h4 class="home-content__title">New</h4>
      <ui-button
        btn-type="empty"
        class="home-content__slide-buttons"
        :class="{'active': selectedSlideCategory === 'movie'}"
        @click="onChangeSliderCategoryFunc('movie')"
      >
        {{ t("movies") }}
      </ui-button>
      <ui-button
        btn-type="empty"
        class="home-content__slide-buttons"
        :class="{'active': selectedSlideCategory === 'series'}"
        @click="onChangeSliderCategoryFunc('series')"
      >
        {{ t("series") }}
      </ui-button>
      <ui-button
        btn-type="empty"
        class="home-content__slide-buttons"
        :class="{'active': selectedSlideCategory === 'cartoon'}"
        @click="onChangeSliderCategoryFunc('cartoon')"
      >
        {{ t("cartoons") }}
      </ui-button>
    </div>
    <div class="home-content__runner-slider">
      <runner-slider
        :images="sliderImages"
        img-size="6rem"
        @selected-img="onNavigateToMovieFunc"
      />
    </div>
    <div class="home-content__page-description">
      <h5 class="page-description__text">{{ t('homePage.pageDescription')}}</h5>
    </div>
    <div>
      <movies-article :page-items-count="20" :items="moviesArticleItems"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import RunnerSlider from "../components/slider/RunnerSlider.vue";
import { ref, watch} from "vue";
import { allFilmsApi } from "../../server/films/allFilmsApi.ts";
import { useRouter } from "vue-router";
import UiButton from "../components/ui/uiButton/UiButton.vue";
import { T_MovieType} from "../../models/server/films/types.ts";
import {I_RunnerSliderData} from "../components/slider/models/interfaces.ts";
import {T_FilteredMovieType} from "../../models/pages/index/types.ts";
import MoviesArticle from "../components/moviesArticle/moviesArticle.vue";
import {filterMoviesCategory} from "../components/moviesArticle/utils/filterMoviesCategory.ts";
import {T_AllMoviesTypes} from "../components/moviesArticle/models/types.ts";
import {I_MovieOptions} from "../components/moviesArticle/models/interfaces.ts";

const { t, locale } = useI18n({useScope: 'global'});
const router = useRouter();


let selectedSlideCategory = ref<T_MovieType>('movie')
let sliderImages = ref<I_RunnerSliderData[]>([])
let moviesArticleItems = ref<T_AllMoviesTypes[]>([])

onFilterRunnerSliderImgFunc()

// IF LOCALE CHANGED, CHANGE MOVIES NAME
watch(locale, () => {
  onFilterRunnerSliderImgFunc()
})

function onFilterRunnerSliderImgFunc(category:T_MovieType = 'movie') {
  selectedSlideCategory.value = category

  let filterConfig = {
    type: selectedSlideCategory.value,
    yearFrom: 2022,
    yearTo: 2024,
  }
  let filteredMovies = filterMoviesCategory(filterConfig)
  sliderImages.value = filteredMovies.map((item: T_FilteredMovieType): I_RunnerSliderData => {
    return {
      title: locale.value === 'en' ? item.nameEn : item.nameRu,
      text: item.year + '',
      value: item.id,
      imgPath: "img/films/" + item.imgSm,
    };
  })
}
function onNavigateToMovieFunc(movieId: number) {
  const newFilmsImg = ref(allFilmsApi);

  let selectedMovie = newFilmsImg.value.find((item) => item.id === movieId);
  if (selectedMovie) {

    router.push({
      path: "/catalog/" + selectedSlideCategory.value + "/movie/" + selectedMovie.id,
    });
  }
}
function onChangeSliderCategoryFunc(category: T_MovieType) {
  let slider = document.querySelector('.home-content__runner-slider')
  slider?.classList.add('slider-transition')
  onFilterRunnerSliderImgFunc(category)
  setTimeout(() => slider?.classList.remove('slider-transition'), 800)
}
function onGetPopularMovies() {
  const movieFilterOption: I_MovieOptions = {
    filter: 'popular'
  }
  moviesArticleItems.value = filterMoviesCategory(movieFilterOption)
}
onGetPopularMovies();


</script>

<style scoped>
.active {
  text-decoration: underline !important;
}
.slider-transition {
  animation: slider-opacity-animation 800ms;
}

.home-content {
  padding: 0 10px;
}
.home-content__title-box {
  padding: 0 20px 20px;
  display: flex;
  align-items: center;
}
.home-content__title {
  font-family: sans-serif;
  color: #303030;
  font-size: 1.2rem;
  margin-right: 10px;
}
.home-content__runner-slider {
  width: 100%;
}
.home-content__slide-buttons {
  padding: 5px;
  font-size: 0.900rem;
  color: #3D3D3D;
  font-family: sans-serif;
  text-decoration: none;
}
.home-content__page-description {
  text-align: center;
  padding: 2rem;
}
.page-description__text {
  font-size: 2vw;
  font-family: sans-serif;
  color: #838383;
}


@keyframes slider-opacity-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


@media (max-width: 768px) {
  .home-content__page-description {
    padding: 1rem;
  }
  .page-description__text {
    font-size: 2.5vw;
  }
}
</style>
