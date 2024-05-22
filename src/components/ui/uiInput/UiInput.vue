<template>
  <div class="input-block">
    <input
        v-model="inputValue"
        :class="inputStyle + ' ' + inputSize"
        :type="inputType"
        :placeholder="placeholder"
        ref="inputItem"
    >
    <div v-if="inputError" class="input-error-text">
      <p>{{ inputError }}</p>
    </div>
    <div class="input-block__right-icon">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {T_InputSize, T_InputStyleType, T_InputType} from "./models/types.ts";

const props = defineProps<{
  modelValue: string;
  typeStyle?: T_InputStyleType;
  type?: T_InputType;
  size?: T_InputSize;
  innerText?: string;
  errorText?: string;
}>();
const emits = defineEmits<{
  (event: "update:model-value", value: string): void;
}>();

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emits("update:model-value", newValue);
  }
});

const inputStyle = computed<T_InputStyleType>(() => props.typeStyle || "default");
const inputSize = computed<T_InputSize>(() => props.size || "md");
const placeholder = computed(() => props.innerText || '');
const inputType = computed<T_InputType>(() => props.type || 'text')
const inputError = computed(() => props.errorText || null)
let inputItem = ref<HTMLElement | null>(null)


</script>

<style scoped>
.paddingLeft {
  padding-left: 20px;
}

.sm {
  padding: 2px;
}
.md {
  padding: 5px;
}
.lg {
  padding: 10px;
}

.default {
  width: 100%;
  box-sizing: border-box;
  font-family: sans-serif;
  font-weight: 400;
  color: black;
  outline: none;
}
.outline {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #3D3D3D;
  border-radius: 3px;
  box-shadow: 0 0 1px 0 #3D3D3D;
  outline: none;
}
.outline:focus {
  outline: 1px solid #3D3D3D;
}

.input-block {
  position: relative;
}
.input-block__left-icon {
  position: absolute;
  left: 0;
  top: 0;
}
.input-block__right-icon {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.input-error-text {
  position: absolute;
  bottom: -20px;
  left: 5px;
}
.input-error-text p {
  color: red;
  font-family: Calibri,sans-serif;
}
</style>
