<template>
  <button :class="btnType + ' ' + btnSize" class="default" :style="currentStyles" :disabled="isDisable">
    <ui-icons
      v-if="icon && iconPlace === 'left'"
      :name="icon"
      :fill="iconFill"
    />
    <slot />
    <ui-icons
      v-if="(icon && iconPlace === 'right') || !iconPlace"
      :name="icon"
      :fill="iconFill"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { T_ButtonSize, T_ButtonType } from "./models/types.ts";
import { T_IconPlace } from "../uiDropdown/models/types.ts";
import UiIcons from "../uiIcons/UiIcons.vue";

const props = defineProps<{
  btnType: T_ButtonType;
  size?: T_ButtonSize;
  currentStyles?: string;
  disable?: boolean;
  icon?: string;
  iconPlace?: T_IconPlace;
  iconWidth?: string;
  iconHeight?: string;
  iconFill?: string;
}>();

const btnType = computed<T_ButtonType>(() => props.btnType || "primary");
const btnSize = computed<T_ButtonSize>(() => props.size || "md");
const icon = computed<string>(() => props.icon || "");
const iconPlace = computed<T_IconPlace>(() => props.iconPlace || "right");
const iconFill = computed<string>(() => props.iconFill || "#0F0F0F");
const currentStyles = computed<string>(() => props.currentStyles || "");
const isDisable = computed(() => props.disable || false)



</script>

<style scoped>
.sm {
  padding: 5px 10px;
}
.md {
  padding: 8px 15px;
}
.lg {
  padding: 12px 20px;
}

.empty {
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0;
}
.default {
  font-family: sans-serif;
  font-weight: 500;
  border-radius: 5px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.default:hover {
  opacity: 0.8;
}

.primary {
  background-color: #4299e1;
  color: whitesmoke;
  border: none;
}
.primary:focus {
  box-shadow: 0 0 2px 2px #4299e1;
}

.outline {
  border: 1px solid rgb(209 213 219);
  background-color: transparent;
  color: #3d3d3d;
}
.outline-border-b {
  border: none;
  background-color: transparent;
  color: #3d3d3d;
  border-radius: 0;
  transition: all 0.3s;
  position: relative;
}
.outline-border-b:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  border-bottom: 1px solid gray;
  transition: width 500ms;
}
.outline-border-b:hover:after {
  width: 100%;
}
</style>
