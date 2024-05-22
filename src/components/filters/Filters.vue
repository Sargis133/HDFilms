<template>
  <div class="filter-section">
    <div class="filter-section__items">
      <div class="filter-section__item">
        <ui-dropdown
          btn-type="outline-border-b"
          size="sm"
          open-type="click"
          icon="arrowBottom"
          dropdown-type="scroll"
          :childs="yearFilterOptions"
          @selectedOption="onChangeYearFromFunc"
          >{{ $t('yearFrom')}}</ui-dropdown
        >
      </div>
      <div class="filter-section__item">
        <ui-dropdown
          btn-type="outline-border-b"
          size="sm"
          open-type="click"
          icon="arrowBottom"
          dropdown-type="scroll"
          :childs="yearFilterOptions"
          @selectedOption="onChangeYearToFunc"
          >{{ $t('yearTo') }}</ui-dropdown
        >
      </div>
      <div class="filter-section__item">
        <ui-dropdown
          btn-type="outline-border-b"
          size="sm"
          open-type="click"
          icon="arrowBottom"
          :multi="true"
          :childs="categoryFilterItems"
          @selectedOption="onChangeCategoryFunc"
        >
          {{ $t('category') }}
        </ui-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiDropdown from "../ui/uiDropdown/UiDropdown.vue";
import { movieYears } from "./config/movieYears.ts";
import { useRoute } from "vue-router";
import { ref, watch} from "vue";
import { navItems } from "../navbar/config/navItems.ts";
import {I_NavItemChildren, I_NavItems} from "../navbar/models/interfaces.ts";
import { T_CategoryType } from "../../../models/server/films/types.ts";
import {I_RouteFilterOptions} from "./models/interfaces.ts";

const route = useRoute();
const emits = defineEmits<{
  (event: "select-filter", value: any): void;
}>();

const yearFilterOptions = ref(movieYears);
let categoryFilterItems = ref<I_NavItemChildren[]>(navItems.find((item: I_NavItems) => item.value === "/" + route.params.type)?.children as I_NavItemChildren[])

// IF ROUTE CATEGORY IS STRING
route.query.category =  route.query.category ? (Array.isArray(route.query.category) ? route.query.category : [route.query.category]) : [];

const filterOptions = ref<I_RouteFilterOptions>({
    yearFrom: route.query.yearFrom ? +route.query.yearFrom : 1974,
    yearTo: route.query.yearTo ? +route.query.yearTo : 2024,
    category: route.query.category ? Array.from(route.query.category) as  T_CategoryType[] : [],
})

function onChangeYearFromFunc(value: number) {
  filterOptions.value.yearFrom = value;
}
function onChangeYearToFunc(value: number) {
  filterOptions.value.yearTo = value;
}
function onChangeCategoryFunc(value: string) {
  const getCategory: T_CategoryType = value.split("/")[1] as T_CategoryType;

  if(!filterOptions.value.category?.includes(getCategory)) {
    filterOptions.value?.category?.push(getCategory);
  } else {
    filterOptions.value.category = filterOptions.value.category.filter((item) => item !== getCategory)
  }

  onSelectDropdownItemsFunc()
}

watch(
  filterOptions,
  () => {
    emits("select-filter", filterOptions.value);
    onSelectDropdownItemsFunc()
  },
  { deep: true, immediate: true },
);

function onSelectDropdownItemsFunc() {
  categoryFilterItems.value = categoryFilterItems.value.map((item:I_NavItemChildren) => {
    item.selected = filterOptions.value.category?.includes(item.value.split('/')[1] as T_CategoryType)
    return item
  })
}

</script>

<style scoped>
.filter-section {
  padding: 3px;
  width: max-content;
}
.filter-section__items {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  grid-column-gap: 10px;
}
.filter-section__item__btn {
  color: #4299e1;
}

@media (max-width: 425px) {
  .filter-section {
    padding: 10px 0;
  }
  .filter-section__items {
    grid-column-gap: 0;
  }

}
</style>
