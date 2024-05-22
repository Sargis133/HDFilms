<template>
  <div class="main">
    <div class="content">
      <div class="content__header">
        <Header />
      </div>
      <div class="content__page">
            <router-view v-slot="{Component, route}">
              <transition name="slide-left">
                <div :key="route.fullPath">
                  <component :is="Component"/>
                </div>
              </transition>
            </router-view>
      </div>
      <div class="footer">
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/header/Header.vue";
import Footer from "../components/footer/Footer.vue";


</script>

<style scoped>
@import "../assets/css/slidePage.css";

.main {
  padding: 20px;
  background: url(/src/assets/img/content-bg.jpg) no-repeat top right fixed;
  min-height: 100vh;
  -moz-background-size: cover;
  background-size: cover;
  overflow: hidden;
}
.content {
  background: white;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content__page {
  margin-top: 20px;
}


@media (max-width: 425px) {
  .main {
    padding: 5px;
  }
}
</style>
