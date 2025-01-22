<template>
  <v-container
    class="d-flex flex-row my-5 pa-0"
    style="height: 85vh; width: 70vw"
  >
    <v-expand-x-transition>
      <v-card
        v-show="!selectedCategory"
        class="fill-height overflow-auto rounded-xl"
        variant="flat"
        style="
          background-color: transparent;
          scrollbar-width: none;
          max-height: 85vh;
        "
      >
        <v-row class="d-flex justify-center align-center ma-0">
          <v-col
            v-for="category in categories"
            :key="category.id"
            :md="category.name === 'Mitsubishi' ? 6 : 4"
          >
            <v-card
              class="rounded-xl hoverCard"
              height="33vh"
              @click="selectedCategory = category"
            >
              <v-img
                :src="category.image || category.altURL"
                cover
                height="25vh"
              />
              <v-card-title class="text-center">{{
                category.name
              }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-expand-x-transition>

    <v-card
      v-show="selectedCategory"
      class="fill-height rounded-xl w-100"
      variant="flat"
      :style="{
        maxHeight: '85vh',
        backgroundColor: 'transparent',
        border: `1px solid ${color.secondary}`,
      }"
    >
      <v-row class="ma-0">
        <v-col md="4" class="pa-0">
          <v-card
            class="d-flex flex-column"
            :style="{
              borderRight: `1px solid ${color.secondary}`,
              height: '85vh',
            }"
          >
            <v-img
              :src="selectedCategory?.image || selectedCategory?.altURL"
              cover
              height="60vh"
            />
            <v-card-title class="text-center">{{
              selectedCategory?.name
            }}</v-card-title>
            <v-card-text class="overflow-auto">{{
              selectedCategory?.description
            }}</v-card-text>
            <v-card-actions>
              <v-btn @click="selectedCategory = null">Back</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="8" class="ma-0 pa-0">
          <v-card
            class="fill-height overflow-auto pa-0"
            :style="{
              maxHeight: '85vh',
              backgroundColor: 'transparent',
              scrollbarWidth: 'none',
            }"
          >
            <v-row v-if="categoryItems.length === 0" class="fill-height">
              <v-col class="d-flex align-center justify-center">
                <span class="text-h5 text-grey"
                  >No items available in this category</span
                >
              </v-col>
            </v-row>

            <v-row v-else class="d-flex justify-center align-center ma-0">
              <v-col v-for="item in categoryItems" :key="item.id" md="6">
                <v-card class="d-flex flex-column rounded-xl" height="40vh">
                  <v-img :src="item.image || item.altURL" cover height="20vh" />
                  <v-card-title class="text-center">
                    {{ item.name }}
                  </v-card-title>
                  <v-card-text class="overflow-auto">
                    <strong v-if="item.priceRange"
                      >Price Range: {{ item.priceRange }}</strong
                    >
                    <br />
                    <p>{{ item.description }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const selectedCategory = ref(null);
const categories = computed(() => store.getters["adminProducts/getCategories"]);
const categoryItems = computed(() => {
  if (!selectedCategory.value) return [];
  return store.getters["adminProducts/getItemsByCategory"](
    selectedCategory.value.id
  );
});
</script>

<style scoped>
.hoverCard {
  transition: transform 0.3s ease;
}
.hoverCard:hover {
  transform: scale(1.05);
}
</style>
