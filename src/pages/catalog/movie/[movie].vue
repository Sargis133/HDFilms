<template>
  <div class="movie-page">
    <div class="movie-page__title-aside">
      <p class="movie-page__big-title">
        {{ locale === "en" ? findMovie.nameEn : findMovie.nameRu }}
      </p>
      <p class="movie-page__small-title">
        {{ locale === "en" ? findMovie.nameRu : findMovie.nameEn }}
      </p>
    </div>

    <div class="movie-page__movie-info">
      <div class="movie-info__movie-image">
        <img
          :src="'img/films/' + findMovie.imgLg"
          alt="movie-image"
          class="movie-image__image"
        />
      </div>

      <div class="movie-info__movie-data">
        <div class="movie-data__movie-rating movie-info__row">
          <p class="movie-data__title">{{ $t("rating") }}:</p>
          <p class="movie-data__text">
            {{ findMovie.rating }}
            <span>
              <ui-icons
                name="fullStar"
                v-for="i in Math.floor(findMovie.rating)"
                :key="i"
              />
              <ui-icons
                name="halfStar"
                v-for="i in Math.ceil(
                  findMovie.rating - Math.floor(findMovie.rating),
                )"
                :key="i"
              />
            </span>
          </p>
        </div>
        <div class="movie-data__movie-year movie-info__row">
          <p class="movie-data__title">{{ $t("year") }}:</p>
          <p class="movie-data__text">{{ findMovie.year }}</p>
        </div>
        <div class="movie-data__movie-category movie-info__row">
          <p class="movie-data__title">{{ $t("category") }}</p>
          <p class="movie-data__text">
            <span v-for="(category, index) in findMovie.category"
              >{{ category
              }}<span v-if="index !== findMovie.category.length - 1"
                >,
              </span></span
            >
          </p>
        </div>
        <div class="movie-data__movie-duration movie-info__row">
          <p class="movie-data__title">{{ $t("duration") }}:</p>
          <p class="movie-data__text">
            {{ findMovie.duration }} {{ $t("min") }}.
          </p>
        </div>
        <div class="movie-data__movie-director movie-info__row">
          <p class="movie-data__title">{{ $t("director") }}:</p>
          <p class="movie-data__text">{{ findMovie.director }}</p>
        </div>
        <div
          class="movie-data__movie-actors movie-info__row"
          v-if="findMovie.actors?.length"
        >
          <p class="movie-data__title">{{ $t("actors") }}</p>
          <p class="movie-data__text">
            <span v-for="(actor, index) in findMovie.actors"
              >{{ actor
              }}<span v-if="index !== findMovie.actors.length - 1">, </span>
              <span v-else> and others</span>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!--    ABOUT MOVIE ASIDE-->
    <div class="movie-page__about-movie-aside">
      <p class="about-movie-aside__title">{{ $t("aboutTheFilm") }}</p>
      <p class="about-movie-aside_text">
        {{ locale === "en" ? findMovie.aboutEn : findMovie.aboutRu }}
      </p>
    </div>

    <!--    VIDEO CONTENT-->
    <div class="movie-page__video-aside">
      <div v-if="!findMovie.video" class="video-box__not-found">
        ! VIDEO NOT FOUND
      </div>
      <div class="movie-page__video-aside__video-box" v-else>
        <video
          :src="'video/films/' + findMovie.video"
          controls
          class="video-box__video"
          id="movie-video"
        ></video>
        <div class="play-btn__box" v-if="isShowPlayBtn">
          <ui-button class="play-btn" btn-type="empty" @click="onPlayVideoFunc">
            <ui-icons name="play" width="50px" height="50px" />
          </ui-button>
        </div>

<!--        SOCIETY BUTTONS-->
        <div class="video-box__share-content">
          <p class="share-content__title">{{ $t('shareAMovie')}}</p>
          <ui-button
            class="share-btn"
            btn-type="empty"
            @click="
              onNavigateToSociety('https://www.facebook.com/?locale=ru_RU')
            "
          >
            <ui-icons name="facebook" width="25px" height="25px" />
          </ui-button>
          <ui-button class="share-btn" btn-type="empty">
            <ui-icons
              name="instagram"
              width="25px"
              height="25px"
              @click="
                onNavigateToSociety('https://www.instagram.com/')
              "
            />
          </ui-button>
          <ui-button
            class="share-btn"
            btn-type="empty"
            @click="
              onNavigateToSociety('https://vk.com/')
            "
          >
            <ui-icons name="vk" width="25px" height="25px" />
          </ui-button>
          <ui-button
            class="share-btn"
            btn-type="empty"
            @click="
              onNavigateToSociety('https://web.telegram.org/a/')
            "
          >
            <ui-icons name="telegram" width="25px" height="25px" />
          </ui-button>
        </div>
      </div>
    </div>

<!--    SEE ANOTHER MOVIES-->
    <div class="movie-page__similar-movies-aside">
      <div class="similar-movies-aside__title">
        <p>{{ $t('viewSimilar' + findMovie.type[0].toUpperCase() + findMovie.type.slice(1))  }}</p>
      </div>
      <div class="similar-movies-aside__movies-box">
        <similar-movies :categories="findMovie.category" :type="findMovie.type"/>
      </div>
    </div>
<!--    SEND REVIEW-->
    <div class="movie-page__review-aside">
      <div class="review-aside__title">
        <p>{{ $t('leaveYourReviewAboutTheFilm')}}</p>
      </div>
      <div class="review-aside__movie-review">
        <movie-review/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { getMovie } from "../../../components/templates/catalog/movie/utils/getMovie.ts";
import { useI18n } from "vue-i18n";
import { T_AllMoviesTypes } from "../../../components/moviesArticle/models/types.ts";
import UiIcons from "../../../components/ui/uiIcons/UiIcons.vue";
import UiButton from "../../../components/ui/uiButton/UiButton.vue";
import SimilarMovies from "../../../components/similarMovies/SimilarMovies.vue";
import MovieReview from "../../../components/movieReview/MovieReview.vue";

const route = useRoute();
const { locale } = useI18n({ useScope: "global" });

let isShowPlayBtn = ref(true);
const movieId = computed<number>(() => +route.params.movie);
const movieType = computed<string>(() => route.params.type + "");
const findMovie = computed<T_AllMoviesTypes>(() =>
  getMovie(movieType.value, movieId.value),
);

function onPlayVideoFunc() {
  let video: HTMLMediaElement | null = document.getElementById(
    "movie-video",
  ) as HTMLMediaElement;
  if (video) video.play();
  isShowPlayBtn.value = false;
}
function onNavigateToSociety(society: string) {
  window.open(society, '_blank');
}
</script>

<style scoped>
.movie-page {
  padding: 0 20px;
}
.movie-page__title-aside {
  margin: 15px 0;
  line-height: 2;
}
.movie-page__big-title {
  font-size: 1.8vw;
  font-family: Tahoma, sans-serif;
  letter-spacing: 2px;
}
.movie-page__small-title {
  font-size: 1.3vw;
  font-family: Arial, sans-serif;
  color: #3d3d3d;
}

.movie-page__movie-info {
  display: flex;
  grid-column-gap: 20px;
}
.movie-info__movie-image {
  border: 2px solid #838383;
  padding: 3px;
  height: max-content;
}
.movie-image__image {
  max-width: 20vw;
}
.movie-info__movie-data {
  display: flex;
  flex-direction: column;
  grid-row-gap: 10px;
  width: 50vw;
}
.movie-info__row {
  display: grid;
  grid-template-columns: 25% 75%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.movie-data__title {
  font-family: Tahoma, sans-serif;
}
.movie-data__text {
  font-family: "Calibri", sans-serif;
}

.movie-page__about-movie-aside {
  width: 50%;
  padding: 15px 0;
}
.about-movie-aside__title {
  font-size: 1.5rem;
  font-family: sans-serif;
  color: #3d3d3d;
}
.about-movie-aside_text {
  font-family: Calibri, sans-serif;
  color: #303030;
  padding: 5px 10px;
  line-height: 1.3;
}

.movie-page__video-aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5vw;
}
.movie-page__video-aside__video-box {
  position: relative;
}
.video-box__video {
  width: 50vw;
  cursor: pointer;
}
.video-box__not-found {
  width: 50vw;
  height: 20vw;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  font-family: Tahoma, sans-serif;
  font-size: 1.5rem;
}
.play-btn__box {
  position: absolute;
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 5;
}
.play-btn {
  border-radius: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4299e1;
}

.share-content__title {
  font-family: Tahoma,sans-serif;
  padding: 0 15px;
}
.video-box__share-content {
  display: flex;
  align-items: center;
  padding: 5px 0;
  background-color: #E1E289;
}
.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}


.similar-movies-aside__movies-box {
  width: 70vw;
}
.similar-movies-aside__title p{
  font-size: 1.4rem;
  font-family: Cambria,sans-serif;
  padding: 5px;
}

.movie-page__review-aside {
  margin: 25px 0;
}
.review-aside__title p{
  padding: 15px 0;
  font-family: Tahoma,sans-serif;
  font-size: 1.3rem;
}
.review-aside__movie-review {
  width: 30vw;
  padding: 0 15px;
}


@media (max-width: 768px) {
  .movie-page__big-title {
    font-size: 3.4vw;
  }
  .movie-page__small-title {
    font-size: 2.3vw;
  }
  .movie-page__movie-info {
    flex-direction: column;
  }
  .movie-info__movie-image {
    border: none;
  }
  .movie-info__movie-data {
    width: 80vw;
  }
  .movie-image__image {
    max-width: 100%;
    padding: 2px;
    border: 1px solid #838383;
  }
  .movie-page__about-movie-aside {
    width: 65vw;
  }
  .movie-page__video-aside__video-box {
    width: 100%;
  }
  .video-box__video {
    width: 100%;
  }
  .review-aside__movie-review {
    width: 250px;
  }
}

@media (max-width: 425px) {
  .movie-page {
    padding: 0 10px;
  }
  .movie-page__big-title {
    font-size: 15px;
  }
  .movie-page__small-title, .movie-data__title, .movie-data__text{
    font-size: 14px;
  }
  .movie-info__movie-data {
    width: 90vw;
  }
  .movie-page__about-movie-aside {
    width: 80vw;
  }

}
</style>
