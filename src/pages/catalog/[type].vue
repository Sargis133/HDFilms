<template>
  <div class="type-page">
    <div class="type-page__title-aside">
      <h4 class="type-page__title">
        {{ $t("watch" + type[0].toUpperCase() + type.slice(1)) }}
      </h4>
    </div>

    <div class="type-page__filter-aside">
      <div class="filter-aside__film-catalog">
        <router-link
          :to="{ path: route.path, query: {} }"
          :class="{ active: !filter }"
        >
          {{ $t("all") }}
        </router-link>
        <router-link
          :to="{ path: route.path, query: { filter: 'popular' } }"
          :class="{ active: filter === 'popular' }"
          >{{ $t("popular") }}</router-link
        >
        <router-link
          :to="{ path: route.path, query: { filter: 'waiting' } }"
          :class="{ active: filter === 'waiting' }"
          >{{ $t("waiting") }}</router-link
        >
      </div>
      <div class="filter-aside__filters">
        <Filters @selectFilter="onSelectedFilterFunc" />
      </div>
    </div>

    <div class="type-page__items-section">
      <movies-article
        :page-items-count="20"
        :items="filteredMovies"
        v-if="filteredMovies.length > 0"
      />
      <div v-else class="type-page__not-found">
        <p>{{ $t("noResultsFound") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Filters from "../../components/filters/Filters.vue";
import { filterMoviesCategory } from "../../components/moviesArticle/utils/filterMoviesCategory.ts";
import {
  T_AllMoviesTypes,
  T_FilterType,
} from "../../components/moviesArticle/models/types.ts";
import { I_MovieOptions } from "../../components/moviesArticle/models/interfaces.ts";
import {
  T_CategoryType,
  T_MovieType,
} from "../../../models/server/films/types.ts";
import MoviesArticle from "../../components/moviesArticle/moviesArticle.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const type = computed<T_MovieType>(() => route.params.type as T_MovieType);
const category = computed<T_CategoryType[]>(() =>
  route.query.category
    ? Array.isArray(route.query.category)
      ? (route.query.category as T_CategoryType[])
      : ([route.query.category] as T_CategoryType[])
    : [],
);

const filter = computed<T_FilterType>(() => route.query.filter as T_FilterType);

const queryFilters = computed<I_MovieOptions>(() => {
  return {
    type: type.value,
    filter: filter.value,
    category: category.value,
    yearFrom: route.query.yearFrom ? +route.query.yearFrom : 1974,
    yearTo: route.query.yearTo ? +route.query.yearTo : 2024,
  };
});
const filteredMovies = computed<T_AllMoviesTypes[]>(() =>
  filterMoviesCategory(queryFilters.value),
);

function onSelectedFilterFunc(option: any) {
  router.push({
    query: {
      ...route.query,
      yearFrom: option.yearFrom,
      yearTo: option.yearTo,
      category: option.category,
    },
  });
}
</script>

<style scoped>
.active {
  text-decoration: underline;
}

.type-page {
  padding: 0 10px;
}
.type-page__title-aside {
  padding: 10px;
}
.type-page__title {
  font-family: sans-serif;
  font-size: 2rem;
  color: #838383;
}
.type-page__filter-aside {
  display: flex;
  align-items: baseline;
  grid-column-gap: 10px;
  padding-left: 25px;
}
.filter-aside__film-catalog {
  display: flex;
  grid-column-gap: 10px;
}
.filter-aside__film-catalog a {
  font-family: "Calibri Light", sans-serif;
  font-size: 17px;
  color: #4299e1;
}
.filter-aside__film-catalog a:hover {
  opacity: 0.6;
}
.type-page__not-found {
  padding: 5%;
  font-size: 2vw;
}

@media (max-width: 768px) {
  .type-page__filter-aside {
    flex-wrap: wrap;
  }
}
@media (max-width: 425px) {
  .type-page__title {
    font-size: 1rem;
  }
  .type-page__filter-aside {
    padding-left: 5px;
  }
}
</style>
