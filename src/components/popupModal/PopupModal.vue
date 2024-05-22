<template>
  <div class="modal-section__modal-box" :class="{'isShowModal': isShowModal}">
    <div class="modal-box">
      <div class="modal-box__title-aside" :class="' ' + popupStyles">
        <ui-icons name="info"/>
        <p class="modal-box__title">
          {{ modalTitle }}
        </p>
      </div>
      <div class="modal-box__body-aside">
        <p v-if="modalText" class="modal-box__text">{{ modalText }}</p>
        <div v-else>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import UiIcons from "../ui/uiIcons/UiIcons.vue";
import {T_PopupType} from "./models/types.ts";

const props = defineProps<{
  isShow: boolean;
  title?: string;
  text?: string;
  popupType: T_PopupType;
}>();

const emits = defineEmits<{
  (event: 'update:is-show', value: boolean): void,
}>()

const isShowModal = computed({
  get() {
    return props.isShow
  },
  set(newValue) {
    emits('update:is-show', newValue)
  }
})
const modalTitle = computed(() => props.title);
const modalText = computed(() => props.text);
const popupStyles = computed<T_PopupType>(() => props.popupType);

setTimeout(() => {
  isShowModal.value = false
}, 4000)

</script>

<style scoped>
.isShowModal {
  animation: popupShow 4s;
}
.modal-section__modal-box {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: -200px;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
}
.modal-box {
  min-width: 25vw;
  background-color: #FFFF;
  height: max-content;
  box-shadow: 0 0 4px 2px #B4B4B4;
  border-radius: 15px;
}
.modal-box__title-aside {
  display: flex;
  grid-column-gap: 5px;
  color: #FFFF;
  font-family: Tahoma,sans-serif;
  letter-spacing: 1px;
  padding: 10px 5px;
  border-radius: 15px 15px 0 0;
}
.modal-box__text {
  padding: 15px 15px;
  font-family: Arial,sans-serif;
}

.success {
  background-color: #9ED266;
}
.error {
  background-color: #FF1616;
}
.default {
  background-color: #4299e1;
}

@keyframes popupShow {
  0% {

  }
  20% {
    top: 10px;
  }
  80% {
    top: 10px;
  }
  100% {
    top: -200px;
  }
}
</style>
