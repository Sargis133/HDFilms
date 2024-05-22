<template>
  <div
    class="dropdown-block"
    @click.stop="openType === 'click' ? onOpenDropdownFunc($event) : ''"
    @mouseenter="openType === 'hover' ? onOpenHoverDropdownFunc() : ''"
    @mouseleave="openType === 'hover' ? onCloseDropdownFunc() : ''"
  >
    <ui-button
      :btn-type="btnType"
      :size="btnSize"
      :icon="icon"
      :icon-place="iconPlace"
      :icon-fill="iconFill"
      :icon-height="iconHeight"
      :icon-width="iconWidth"
    >
      <slot />
    </ui-button>
    <template v-if="children.length > 0">
      <div
        class="dropdown__childs-block"
        :class="dropType === 'wrap' ? 'dropdown-wrap' : 'dropdown-scroll'"
        v-if="isShowDropdown"
      >
        <div
          class="dropdown__child"
          v-for="item in children"
          :key="item.value"
          :class="{ selected: item.selected}"
          @click.stop="isMulti ? onSelectOptionMultiFunc(item.value) : onSelectOptionFunc(item.value)"
        >
          <template v-if="item.iconName">
            <ui-icons
              v-if="item.iconName && item.iconPlace === 'left'"
              :name="item.iconName"
              :width="item.iconWidth"
              :height="item.iconHeight"
            />
          </template>
          <p>{{ item.name }}</p>
          <template v-if="item.iconName">
            <ui-icons
              v-if="
                (item.iconName && item.iconPlace === 'right') || !item.iconPlace
              "
              :name="item.iconName"
              :width="item.iconWidth"
              :height="item.iconHeight"
            />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import UiButton from "../uiButton/UiButton.vue";
import { T_ButtonSize, T_ButtonType } from "../uiButton/models/types.ts";
import { computed, ref } from "vue";
import { I_DropdownOptions } from "./models/interfaces.ts";
import { T_DropdownType, T_IconPlace, T_OpenType } from "./models/types.ts";
import UiIcons from "../uiIcons/UiIcons.vue";

const props = defineProps<{
  btnType: T_ButtonType;
  openType?: T_OpenType;
  size?: T_ButtonSize;
  childs?: I_DropdownOptions[];
  dropdownType?: T_DropdownType;
  multi?: boolean,
  icon?: string;
  iconPlace?: T_IconPlace;
  iconWidth?: string;
  iconHeight?: string;
  iconFill?: string;
}>();
const emits = defineEmits<{
  (event: "selected-option", value: string): void;
}>();

let isShowDropdown = ref(false);

const btnType = computed<T_ButtonType>(() => props.btnType || "primary");
const openType = computed(() => props.openType || "hover");
const btnSize = computed<T_ButtonSize>(() => props.size || "md");
const icon = computed<string>(() => props.icon || "");
const iconPlace = computed<T_IconPlace>(() => props.iconPlace || "right");
const iconFill = computed<string>(() => props.iconFill || "#0F0F0F");
const iconWidth = computed(() => props.iconWidth || "20px");
const iconHeight = computed(() => props.iconHeight || "20px");
const dropType = computed<T_DropdownType>(() => props.dropdownType || "wrap");
const children = computed<I_DropdownOptions[]>(() => props.childs || []);
const isMulti = computed(() => props.multi || false)

// IF CLICK OUT DROPDOWN OR OPEN DROPDOWN
function onOpenDropdownFunc(dropdown: any): void {
  isShowDropdown.value = !isShowDropdown.value;

  window.addEventListener("click", function (outside) {
    if (!dropdown.target.contains(outside.target)) {
      isShowDropdown.value = false;
      return;
    }
  });
}
function onOpenHoverDropdownFunc() {
  isShowDropdown.value = true;
}
function onCloseDropdownFunc() {
  isShowDropdown.value = false;
}
function onSelectOptionFunc(value: string): void {
  emits("selected-option", value);
  isShowDropdown.value = false;
}
function onSelectOptionMultiFunc(value: string) {
  emits("selected-option", value);
}
</script>

<style scoped>
.selected {
  background-color: #838383;
}

.dropdown-block {
  position: relative;
  width: max-content;
}
.dropdown-wrap {
  flex-wrap: wrap;
}
.dropdown-scroll {
  overflow-y: auto;
}
.dropdown__childs-block {
  display: flex;
  flex-direction: column;
  width: max-content;
  max-height: 200px;
  position: absolute;
  z-index: 5;
  background-color: #ffff;
  border-radius: 5px;
  box-shadow: 0 0 2px 2px #838383;
}
.dropdown__child {
  padding: 8px 10px;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 0.9rem;
}
.dropdown__child:hover {
  opacity: 0.5;
}
@media (max-width: 425px) {
  .dropdown__childs-block {
    display: none;
  }
}
</style>
