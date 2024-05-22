<template>
  <div class="movies-article" v-if="itemsCountOnPage">
    <div class="movies-article__items">
      <div
        class="movies-article__movie-item"
        v-for="item in slicedItems"
        :key="item.nameEn + item.year"
      >
        <router-link :to="'/catalog/'+ item.type + '/movie/' + item.id">
          <div class="movie-item__img-box">
            <img
              class="movie-item__img"
              :src="'/img/films/' + item.imgLg"
              alt="movie-img"
            />
          </div>
          <div class="movie-item__movie-descriptions">
            <p class="movie-item__movie-title">
              {{ locale === "en" ? item.nameEn : item.nameRu }}
            </p>
            <p class="movie-item__movie-year">
              {{ item.year }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="movies-article__pagination">
      <pagination
        :selected-page="selected"
        :page-count="pageCounts"
        @change-page="onChangedPageFunc"
      />
    </div>
  </div>
  <div v-else>Loader</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Pagination from "../pagination/pagination.vue";
import { I_MoviesArticleItems } from "./models/interfaces.ts";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{
  items: I_MoviesArticleItems[];
  pageItemsCount: number;
}>();
const { locale } = useI18n({ useScope: "global" });
const route = useRoute();
const router = useRouter();

const type = computed(() => route.params.type)
const allItems = computed(() => props.items);
const selected = ref<number>(route.query.page ? +route.query.page : 1);
const itemsCountOnPage = computed(() => props.pageItemsCount);
const pageCounts = computed(() => {
  return Math.ceil(allItems.value.length / itemsCountOnPage.value);
});

let slicedItems = ref(
  allItems.value.slice(
    (selected.value - 1) * itemsCountOnPage.value,
    itemsCountOnPage.value,
  ),
);

watch(allItems, () => {
  onChangedPageFunc(selected.value)
}, {immediate: true});
// IF TYPE CHANGED SET PAGE 1
watch(type, () => {
  selected.value = 1;
  onChangedPageFunc(selected.value)
})

function onChangedPageFunc(page: number | string) {
  selected.value =
    page === "next"
      ? (selected.value += 1)
      : page === "prev"
        ? (selected.value -= 1)
        : (page as number);

  let startSlice = (selected.value - 1) * itemsCountOnPage.value;
  let endSlice = startSlice + itemsCountOnPage.value;
  slicedItems.value = allItems.value.slice(startSlice, endSlice);
  router.push({ query: { ...route.query, page: selected.value } });

  scrollTo({
    top: 0,
    behavior:'smooth'
  })
}
</script>

<style scoped>
.movies-article {
  padding: 10px;
}
.movies-article__items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 200px));
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
}
.movies-article__movie-item {
  border: 1px solid #838383;
  border-radius: 5px;
  box-shadow: 0 0 2px 0 #838383;
  padding: 5px;
  height: 100%;
}
.movies-article__movie-item a {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
}
.movies-article__movie-item:hover .movie-item__movie-descriptions p {
  text-decoration: underline;
}
.movies-article__movie-item:hover {
  box-shadow: 0 0 4px 1px #838383;
}
.movies-article__movie-item:hover .movie-item__img {
  animation: img-scale-animation 4s;
}
.movie-item__img-box {
  height: 80%;
  overflow: hidden;
}
.movie-item__img {
  width: 100%;
  height: 100%;
}
.movie-item__movie-title {
  font-family: "Calibri Light", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
}

.movies-article__pagination {
  padding: 20px 0;
}

@keyframes img-scale-animation {
  0% {
  }
  50% {
    scale: 1.2;
    transform: rotate(2deg);
  }
  100% {
    transform: rotate(0);
    scale: 1;
  }
}

@media (max-width: 768px) {
  .movies-article__items {
    grid-template-columns: repeat(auto-fill,minmax(100px, 150px));
  }
}

@media (max-width: 425px) {
  .movies-article__items {
    grid-template-columns: repeat(auto-fill, 95px);
    grid-column-gap: 5vw;
    justify-content: center;
  }
  .movie-item__movie-title {
    font-size: 14px;
  }
  .movie-item__movie-year {
    font-size: 13px;
  }
  .movie-item__img-box {
    height: 70%;
  }
  .movie-item__img {
    object-fit: cover;
  }
}
</style>
