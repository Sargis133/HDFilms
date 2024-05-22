<template>
<div class="review-box">
  <div class="review-box__text-area">
    <textarea class="text-area" v-model="movieReviewData.text"/>
  </div>
  <div class="review-box__stars-box">
    <div class="review-box__star" v-for="i in 5" :key="i">
      <ui-button btn-type="empty" @mouseenter="onStarHover(i)" @mouseleave="onLeaveStar" @click="onSelectStar(i)">
        <ui-icons name="emptyStar" :fill="selectedStar >= i ? 'yellow' : 'white'"/>
      </ui-button>
    </div>
  </div>
  <div class="review-box__btn">
    <ui-button btn-type="primary" @click="onSendReviewFunc">
      {{ $t('send') }}
    </ui-button>
  </div>
</div>
    <popup-modal v-if="isShowPopup" :title="$t('success')" popup-type="success" :text="$t('yourReviewHasBeenSent')" v-model:is-show="isShowPopup"/>
</template>

<script setup lang="ts">
import UiButton from "../ui/uiButton/UiButton.vue";
import UiIcons from "../ui/uiIcons/UiIcons.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import PopupModal from "../popupModal/PopupModal.vue";
import {I_MovieReviewData} from "./models/interfaces.ts";

const route = useRoute()

let isShowPopup = ref(false)
let selectedStar = ref<number>(0);
let onSelectedStar = ref(false);

const movieReviewData = ref<I_MovieReviewData>({
  movieId: +route.params.movie,
  star: null,
  text: '',
})

function onStarHover(id: number) {
  if(!onSelectedStar.value) selectedStar.value = id
}
function onLeaveStar() {
  if(!onSelectedStar.value)
  selectedStar.value = 0
}
function onSelectStar(id: number) {
  onSelectedStar.value = true
  selectedStar.value = +id
  movieReviewData.value.star = +id
}
function onSendReviewFunc() {
  isShowPopup.value = true;
  movieReviewData.value.text = ''
  movieReviewData.value.star = null
}

</script>

<style scoped>

.review-box {
  width: 100%;
  height: 100%;
}
.review-box__text-area {
  width: 100%;
  height: 100%;
}
.review-box__stars-box {
  display: flex;
  justify-content: end;
  padding: 10px 0;
}
.text-area {
  width: 100%;
  min-height: 15vh;
}
.review-box__btn {
  display: flex;
  justify-content: end;
}
</style>