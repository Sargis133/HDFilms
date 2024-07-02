<template>
  <div class="navbar">
    <div class="navbar__items-list">
      <div class="navbar__item" v-for="item in navbarItems" :key="item.value">
        <ui-dropdown
          size="sm"
          btn-type="outline-border-b"
          icon="arrowBottom"
          icon-fill="gray"
          open-type="hover"
          :childs="onChangeChildsLocalFunc(item.children)"
          @click.stop="onSelectCategoryFunc(item.value)"
          @selectedOption="selectedOptionFunc"
          >{{ t(item.name.toLowerCase()) }}</ui-dropdown
        >
      </div>
    </div>

    <div class="navbar__search-box">
      <ui-input
        v-model="searchInput"
        type-style="outline"
        icon-place="right"
        :inner-text="t('search')"
        @input="onSearchMovieFunc"
      >
        <ui-button btn-type="empty" class="search-box__btn">
          <ui-icons :name="searchInputIcon" width="20px" height="20px" @click="onClickCleanSearchFunc"/>
        </ui-button>
      </ui-input>
      <div class="search-box__items" v-if="searchInput">
        <div v-if="searchMovies.length === 0" class="search-box__empty-result">
          <p>No results</p>
        </div>
        <div v-for="movie in searchMovies" :key="movie.nameEn">
          <router-link :to="{path: '/catalog/' + movie.type + '/movie/' + movie.id}" class="search-box__item">
            <div class="search-box__item-img">
              <img :src="'img/films/' + movie.imgSm" alt="movie-img">
            </div>

            <div class="search-box__item-info">
              <p class="search-box__item-info__title">{{ locale === 'en' ? movie.nameEn : movie.nameRu }}</p>
              <p class="search-box__item-info__subtitle">{{ locale === 'en' ? movie.nameRu : movie.nameEn }}</p>
              <p class="search-box__item-info__year">{{ movie.year }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiDropdown from "../ui/uiDropdown/UiDropdown.vue";
import {computed, ref} from "vue";
import { navItems } from "./config/navItems.ts";
import UiInput from "../ui/uiInput/UiInput.vue";
import { useI18n } from "vue-i18n";
import { I_DropdownOptions } from "../ui/uiDropdown/models/interfaces.ts";
import { changeItemLocalName } from "./utils/changeItemLocalName.ts";
import { useRouter } from "vue-router";
import {searchMovie} from "./utils/searchMovie.ts";
import {I_ItemSearchResult, I_NavItems} from "./models/interfaces.ts";
import UiIcons from "../ui/uiIcons/UiIcons.vue";
import UiButton from "../ui/uiButton/UiButton.vue";

const { t,locale } = useI18n({ useScope: "global" });
const router = useRouter();

const navbarItems = ref<I_NavItems[]>(navItems);
let searchInput = ref<string>("");
let searchInputIcon = computed<'close' | 'search'>(() => searchInput.value ? 'close' : 'search')
let searchMovies = ref<I_ItemSearchResult[]>([]);

function onClickCleanSearchFunc() {
    searchInput.value = ''
}
function onSearchMovieFunc() {
  searchMovies.value = searchMovie(searchInput.value)
}
function onChangeChildsLocalFunc(childs: I_DropdownOptions[]) {
  return changeItemLocalName(childs);
}
function selectedOptionFunc(value: string): void {
  router.push({
    path: "/catalog/" + value.split("/")[0],
    query: { category: [value.split("/")[1]] },
  });
}
function onSelectCategoryFunc(category: string): void {
  router.push({ path: "/catalog" + category });
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
}
.navbar__items-list {
  display: flex;
  align-items: center;
}
.navbar__search-box {
  position: relative;
}

.search-box__btn {
  padding-right: 5px;
}
.search-box__items {
  position: absolute;
  width: 30vw;
  padding: 5px;
  background-color: #303030;
  z-index: 15;
  top: 28px;
  border-radius: 5px;
  right: 0;
  overflow-x: auto;
  max-height: 60vh;
  box-shadow: 0 0 10px 2px #303030;
}
.search-box__items::-webkit-scrollbar{
  width: 5px;
}
.search-box__items::-webkit-scrollbar-track{
  background-color: #838383;
  border-radius: 3px;
}
.search-box__items::-webkit-scrollbar-thumb{
  background-color: #303030;
  border-radius: 3px;

}
.search-box__empty-result p{
  color: white;
  font-family: "Calibri Light",sans-serif;
}
.search-box__item {
  display: grid;
  grid-template-columns: 40% 50%;
  grid-column-gap: 10px;
}
.search-box__item:hover {
  opacity: 0.7;
}
.search-box__item-info {
  color: white;
}
.search-box__item-info__title {
  font-family: Tahoma,sans-serif;
  font-size: 17px;
}
.search-box__item-info__subtitle {
  font-family: "Calibri Light",sans-serif;
}
.search-box__item-info__year {
  font-family: "Times New Roman", sans-serif;
  color: white;
  padding: 15px 0;
}

.search-box__item-img img {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    grid-row-gap: 15px;
  }
  .search-box__items {
    width: 100%;
  }
}
</style>
