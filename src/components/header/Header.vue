<template>
  <div class="header">
    <div class="header__top-content">
      <div class="header__items">
        <router-link to="/" class="header__logo">
          <div class="logo__circle-box">
            <div class="logo__circle">
              <p>HD</p>
            </div>
          </div>
          <p class="logo__text">FILMS</p>
        </router-link>
        <div class="header__auth-links">
          <router-link to="/login">{{ t('login') }}</router-link>
          <router-link to="/signup">{{ t('signup')}}</router-link>
          <div>
            <ui-dropdown
              btn-type="empty"
              open-type="click"
              size="sm"
              :childs="[
                { iconName: 'en', value: 'en' },
                { iconName: 'ru', value: 'ru' },
              ]"
              @selectedOption="onChangeLangFunc"
            >
              <ui-icons :name="locale" />
            </ui-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="header__nav-bar">
      <Navbar />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../navbar/Navbar.vue";
import UiDropdown from "../ui/uiDropdown/UiDropdown.vue";
import { useI18n } from "vue-i18n";
import UiIcons from "../ui/uiIcons/UiIcons.vue";

const { t, locale } = useI18n({ useScope: "global" });

function onChangeLangFunc(lang: string) {
  locale.value = lang
}
</script>

<style scoped>
.header {
  width: 100%;
}
.header__top-content {
  display: flex;
  justify-content: end;
  background-color: #3d3d3d;
  height: 35px;
}
.header__items {
  display: flex;
  justify-content: space-between;
  width: 55%;
}
.header__logo {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: opacity 0.3s;
}
.header__logo:hover {
  opacity: 0.8;
}
.logo__circle-box {
  width: 55px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.logo__circle {
  background-color: #838383;
  padding: 8px;
  border-radius: 20px;
}
.logo__circle p {
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 800;
  color: #3d3d3d;
}
.logo__text {
  color: #838383;
  font-family: sans-serif;
  font-weight: 800;
  font-size: 18px;
}
.header__auth-links {
  display: flex;
  align-items: center;
  grid-column-gap: 20px;
  padding: 0 15px;
}
.header__auth-links a {
  color: #838383;
  font-size: 15px;
  font-family: sans-serif;
}
.header__auth-links a:hover {
  opacity: 0.8;
}
.header__nav-bar {
  box-shadow: 0 3px 4px -3px darkgray;
}

@media (max-width: 768px) {
  .header__top-content {
    justify-content: center;
  }
  .header__items {
    width: 95%;
  }
}

@media (max-width: 425px) {
  .logo__circle-box {
    width: 44px;
  }
  .logo__circle p,.logo__text {
    font-size: 15px;
  }
}
</style>
