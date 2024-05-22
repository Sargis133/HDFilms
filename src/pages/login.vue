<template>
  <div class="login-page">
    <div class="login-aside">
      <div class="login-aside__title-box">
        <p>{{ $t("login") }}</p>
      </div>
      <div class="login-aside__body">
        <div class="login-aside__input-box">
          <ui-input
            v-model="loginData.email"
            :inner-text="$t('email')"
            type-style="outline"
            size="lg"
            :error-text="loginErrors.email ? $t(loginErrors.email) : ''"
          />
        </div>
        <div class="login-aside__input-box">
          <ui-input
            v-model="loginData.password"
            :type="passwordInputType"
            :inner-text="$t('password')"
            :error-text="loginErrors.password ? $t(loginErrors.password) : ''"
            type-style="outline"
            size="lg"
          >
            <ui-button
              btn-type="empty"
              class="login-aside__password-btn"
              @click="onShowPasswordFunc"
            >
              <ui-icons :name="passwordIcon" />
            </ui-button>
          </ui-input>
        </div>
        <div class="login-aside__button-box">
          <ui-button btn-type="primary" size="lg" @click="onSendLoginDataFunc"
            >Ok</ui-button
          >
        </div>
      </div>
    </div>
  </div>
  <popup-modal
    v-if="isShowPopup"
    v-model:is-show="isShowPopup"
    :popup-type="popupConfig.type"
    :title="$t(popupConfig.title)"
    :text="$t(popupConfig.text)"
  />
</template>

<script setup lang="ts">
import UiInput from "../components/ui/uiInput/UiInput.vue";
import { ref } from "vue";
import UiButton from "../components/ui/uiButton/UiButton.vue";
import UiIcons from "../components/ui/uiIcons/UiIcons.vue";
import PopupModal from "../components/popupModal/PopupModal.vue";
import {checkEmailValidFunc} from "../components/templates/login/utils/checkEmailValidFunc.ts";

const loginData = ref({
  email: "",
  password: "",
});
const loginErrors = ref({
  email: "",
  password: "",
});
const popupConfig = ref({
  type: 'success',
  title: '',
  text: '',
})

let passwordInputType = ref("password");
let passwordIcon = ref("closeEye");
let isShowPopup = ref(false);

function onShowPasswordFunc() {
  if (passwordInputType.value === "password") {
    passwordInputType.value = "text";
    passwordIcon.value = "eye";
  } else {
    passwordInputType.value = "password";
    passwordIcon.value = "closeEye";
  }
}

function onSendLoginDataFunc() {
  loginErrors.value.email = loginData.value.email === "" ? "required" : "";
  loginErrors.value.password =
    loginData.value.password === "" ? "required" : "";
  if (!Object.values(loginErrors.value).filter((item) => !!item).length) {
    console.log(checkEmailValidFunc(loginData.value.email))
    if(!checkEmailValidFunc(loginData.value.email)) {
      loginErrors.value.email = 'emailNotCorrect'
    } else {
      popupConfig.value.title = 'success'
      popupConfig.value.text = 'loginCompleted'
      isShowPopup.value = true
      setTimeout(() => window.location.href = '/', 4000)
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vw;
}
.login-aside {
  border: 1px solid #838383;
  border-radius: 20px;
  box-shadow: 0 0 5px 2px #838383;
  width: 30vw;
}
.login-aside__title-box {
  padding: 1vw;
  text-align: center;
}
.login-aside__title-box p {
  font-family: Calibri, sans-serif;
  font-size: 2vw;
  color: #3d3d3d;
}
.login-aside__body {
  padding: 1vw;
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  grid-row-gap: 7vh;
}
.login-aside__password-btn {
  padding-right: 5px;
}
.login-aside__button-box {
  display: flex;
  justify-content: end;
}

@media (max-width: 1024px) {
  .login-aside {
    width: 40vw;
  }
  .login-aside__title-box p {
    font-size: 3vw;
  }
  .login-aside__body {
    grid-row-gap: 40px;
  }
}
@media (max-width: 768px) {
  .login-aside {
    width: 70vw;
  }
  .login-aside__title-box p {
    font-size: 4vw;
  }
}
@media (max-width: 425px) {
  .login-aside {
    width: 80vw;
  }
  .login-aside__title-box p {
    font-size: 20px;
  }
}
</style>
