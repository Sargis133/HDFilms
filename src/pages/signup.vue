<template>
<div class="signup-page">
  <div class="signup-page__signup-aside">
    <div class="signup-aside__title-box">
      <p>Signup</p>
    </div>
    <div class="signup-aside__body">
      <div class="signup-aside__inputs">
        <div class="signup-aside__row">
          <div class="signup-aside__input-box">
            <label for="nameInput">Name</label>
            <ui-input v-model="signupData.name" id="nameInput" type-style="outline"/>
          </div>
          <div class="signup-aside__input-box">
            <label for="emailInput">Email</label>
            <ui-input v-model="signupData.email" id="emailInput" type-style="outline"/>
          </div>
        </div>
        <div class="signup-aside__row">
          <div class="signup-aside__input-box">
            <label for="passwordInput">Password</label>
            <ui-input v-model="signupData.password" id="passwordInput" type-style="outline"/>
          </div>
          <div class="signup-aside__input-box">
            <label for="confirmInput">Confirm Password</label>
            <ui-input v-model="signupData.confirmPassword" id="confirmInput" type-style="outline"/>
          </div>
        </div>
        <div class="signup-aside__btn-box">
          <ui-button btn-type="primary">SignUp</ui-button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script setup lang="ts">

import UiInput from "../components/ui/uiInput/UiInput.vue";
import {ref} from "vue";
import UiButton from "../components/ui/uiButton/UiButton.vue";

const signupData = ref({
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
})


</script>

<style scoped>
.signup-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vw;
}
.signup-page__signup-aside {
  border: 1px solid #838383;
  border-radius: 20px;
  box-shadow: 0 0 5px 2px #838383;
  padding: 20px;
}
.signup-aside__inputs {
  display: flex;
  flex-direction: column;
  grid-row-gap: 20px;
}
.signup-aside__row{
  display: flex;
  grid-column-gap: 20px;
}
</style>