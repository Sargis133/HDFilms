<template>
  <div class="items-wrap">
    <div class="items marquee">
      <div v-for="item in slideImages" class="item">
        <img
          :src="item.imgPath"
          alt="x"
          class="slider-img"
          :style="'width:' + imageSize"
          @click="onSelectImgFunc(item.value || null)"
        />
        <p class="item-title" v-if="item.title">
          {{ item.title }}
        </p>
        <span v-if="item.text" class="item-text">{{ item.text }}</span>
      </div>
    </div>
    <div class="items marquee">
      <div v-for="item in slideImages" class="item">
        <img
          :src="item.imgPath"
          alt="x"
          class="slider-img"
          :style="'width:' + imageSize"
          @click="onSelectImgFunc(item.value || null)"
        />
        <p class="item-title" v-if="item.title">
          {{ item.title }}
        </p>
        <span v-if="item.text" class="item-text">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {I_RunnerSliderData} from "./models/interfaces.ts";

const props = defineProps<{
  images: I_RunnerSliderData[];
  imgSize?: string;
}>();
const emits = defineEmits<{
  (event: 'selected-img', value: number): void
}>()

const slideImages = computed<I_RunnerSliderData[]>(() => props.images);
const imageSize = computed<string>(() => props.imgSize || "100px");


function onSelectImgFunc(imgId: number): void {
  emits('selected-img', imgId)
}
</script>

<style scoped>
.items-wrap {
  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 100%;
  gap: 20px;
}
.items-wrap:before,
.items-wrap:after {
  content: "";
  height: 100%;
  top: 0;
  width: 5%;
  position: absolute;
  z-index: 1;
  pointer-events: none;
}
.items-wrap:before {
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
.items-wrap:after {
  right: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}
.items {
  flex-shrink: 0;
  display: flex;
  gap: 20px;
  justify-content: space-around;
  min-width: 100%;
  align-items: flex-start;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  flex: 0 0 auto;
  width: min-content;
  border-radius: 6px;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

}
.item:hover .item-title{
  text-decoration: underline;
}
.item-title {
  max-width: 100%;
  text-align: center;
  font-family: sans-serif;
}
.item-text {
  font-family: sans-serif;
  color: #3D3D3D;
}
.slider-img {
  object-fit: cover;
}
.marquee {
  animation: scroll 40s linear infinite;
}
.items-wrap:hover .marquee {
  animation-play-state: paused;
}
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 20px));
  }
}
</style>
