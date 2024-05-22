<template>
  <div>
    <div class="pagination-buttons">
      <ui-button
          btn-type="outline"
          size="sm"
          v-bind:disabled="selected == 1"
          :class="{
                  'selected':
                    selected == 1,
                }"
          @click="onChangePageFunc('prev')"
      >
        <ui-icons
            name="arrowLeft"
        />
      </ui-button>
      <div class="pagination-numbers">
        <div class="pagination-number" v-for="page in pagesBtn">
          <ui-button
              btn-type="outline"
              size="sm"
              :class="{
                      'selected':
                        page == selected,
                    }"
              v-bind:disabled="page == 0 || selected == page"
              @click="onChangePageFunc(page)"
          >
            {{ page == 0 ? "..." : page }}
          </ui-button>
        </div>
      </div>
      <ui-button
          btn-type="outline"
          size="sm"
          v-bind:disabled="selected == count"
          @click="onChangePageFunc('next')"
      >
        <ui-icons
            name="arrowRight"
        />
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import UiButton from "../ui/uiButton/UiButton.vue";
import UiIcons from "../ui/uiIcons/UiIcons.vue";

const props = defineProps<{
  selectedPage: number,
  pageCount: number,
}>()
const emits = defineEmits<{
  (event: 'change-page', value: string | number): void
}>()

let selected = computed<number>(() => props.selectedPage);
let count = computed<number>(() => props.pageCount);
let pagesBtn = ref<number[]>([])

watch(
    [count, selected],
    ([pageCount, ]) => {
      if (pageCount < 7) {
        let btnCounts = []
        for(let i = 1; i <= pageCount; i++) {
          btnCounts.push(i)
        }
        pagesBtn.value = btnCounts
      }
      else {
        if (selected.value >= pageCount - 2)
          pagesBtn.value = [
            1,
            0,
            pageCount - 3,
            pageCount -2,
            pageCount -1,
            pageCount
          ];
        else if (selected.value > 3 && selected.value < pageCount - 2)
          pagesBtn.value = [
            1,
            0,
            selected.value - 1,
            selected.value,
            selected.value + 1,
            0,
            pageCount,
          ];
        else if (selected.value <= 3)
          pagesBtn.value = [1, 2, 3, 4, 0, pageCount];
      }
    },
    { immediate: true },
);

function onChangePageFunc(page: string | number) {
  emits('change-page', page)
}
</script>

<style scoped>
.selected {
  color: #838383;
}
.pagination-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination-numbers {
  display: flex;
  align-items: center;
}
.pagination-number {
  min-width: 30px;
}
</style>