<template>
<div class="footer-aside">
  <div class="footer-aside__columns">
    <div class="footer-aside__route-about">
      <div class="footer-aside__routes">
        <router-link :to="{path: '/catalog/movie'}">{{ $t('movies')}}</router-link>
        <router-link :to="{path: '/catalog/series'}">{{ $t('series')}}</router-link>
        <router-link :to="{path: '/catalog/cartoon'}">{{ $t('cartoons')}}</router-link>
      </div>
      <div class="footer-aside__about-text">
        <p>{{ $t('hdFilmsFreeOnlineCinema')}}</p>
      </div>
    </div>
    <div class="footer-aside__description">
      <div class="footer-aside__privacy">
        <p>© 2024 HDFilms.com</p>
      </div>
      <div class="footer-aside__buttons">
        <ui-button btn-type="empty" @click="onNavigateToSociety('https://web.telegram.org/a/')">
          <ui-icons name="telegramLight" width="25px" height="25px"/>
        </ui-button>
        <ui-button btn-type="empty" @click="onNavigateToSociety('https://twitter.com/?lang=ru')">
          <ui-icons name="twitterLight" width="25px" height="25px"/>
        </ui-button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import UiButton from "../ui/uiButton/UiButton.vue";
import UiIcons from "../ui/uiIcons/UiIcons.vue";


function onNavigateToSociety(society: string) {
  window.open(society,'_blank');
}
</script>

<style scoped>
.footer-aside {
  background-color: black;
  padding: 1rem 10rem;
}
.footer-aside__columns {
  display: flex;
  justify-content: space-around;
}
.footer-aside__route-about {
  display: flex;
  flex-direction: column;
  grid-row-gap: 10px;
}
.footer-aside__routes a{
  color: #616161;
  font-family: Cambria,sans-serif;
}
.footer-aside__routes a:hover {
  text-decoration: underline;
}
.footer-aside__routes {
  display: flex;
  grid-column-gap: 15px;
}
.footer-aside__about-text p{
  color: #616161;
  font-size: 14px;
  font-family: "Calibri Light",sans-serif;
}
.footer-aside__description {
  display: flex;
  flex-direction: column;
  grid-row-gap: 10px;
}
.footer-aside__privacy {
  color: #616161;
}
.footer-aside__buttons {
  display: flex;
  grid-column-gap: 5px;
}


@media (max-width: 768px) {
  .footer-aside {
    padding: 1rem 0;
  }
}
@media (max-width: 425px) {
  .footer-aside__columns {
    flex-wrap: wrap;
    justify-content: center;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
  }
  .footer-aside__buttons {
    justify-content: center;
  }
}
</style>