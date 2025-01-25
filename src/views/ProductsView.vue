<template>
  <!-- eslint-disable -->
  <div class="background">
    <v-container
      fluid
      class="d-flex flex-column my-5 pa-0"
      style="height: auto; width: 70vw"
    >
      <v-expand-x-transition>
        <v-card
          v-show="!selectedCategory"
          class="fill-height overflow-auto rounded-xl"
          variant="flat"
          style="background-color: transparent; scrollbar-width: none"
        >
          <v-row class="d-flex justify-center align-center ma-0">
            <v-col
              v-for="category in categories"
              :key="category.id"
              :cols="12"
              :sm="6"
              :md="category.name === 'Mitsubishi' ? 8 : 4"
              class="d-flex justify-center"
            >
              <v-card
                class="rounded-xl hoverCard"
                style="width: 100%; max-height: 40vh;"
                @click="selectedCategory = category"
                :style="{ border: `2px solid ${color.secondary}` }"
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

      <!-- This is the transition left -->
      <v-card
        v-show="selectedCategory"
	ref="categoryList"
        class="fill-height rounded-xl"
        variant="flat"
        :style="{ backgroundColor: 'transparent', border: `2px solid ${color.secondary}` }"
      >
        <v-row>
          <v-col :cols="12" :md="4" class="pa-0">
            <v-card
              class="d-flex flex-column"
              :style="{ borderRight: `2px solid ${color.secondary}`, height: '100%' }"
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

          <!-- Right side of the transition -->
          <v-col :cols="12" :md="8" class="pa-0">
            <v-row class="d-flex justify-center align-center ma-3">
  <v-col :cols="12" :md="8" :lg="6">
    <v-text-field
      append-inner-icon="fa-solid fa-magnifying-glass"
      density="compact"
      variant="solo"
      hide-details
      placeholder="Search items..."
      class="rounded-lg"
    ></v-text-field>
  </v-col>
</v-row>
            <v-card
              class="fill-height overflow-auto pa-0"
              :style="{ backgroundColor: 'transparent', scrollbarWidth: 'none', maxHeight: 'calc(85vh - 50px)', overflowY: 'auto' }"
            >
              <v-row
                v-if="categoryItems.length === 0"
                class="fill-height"
              >
                <v-col class="d-flex align-center justify-center">
                  <span class="text-h5 text-grey">
                    No items available in this category
                  </span>
                </v-col>
              </v-row>

              <v-row v-else class="d-flex justify-center align-center ma-0">
                <v-col
                  v-for="item in categoryItems"
                  :key="item.id"
                  :cols="12"
                  :sm="6"
                  :md="4"
                  class="d-flex justify-center"
                >
                  <v-card
                    class="d-flex flex-column rounded-xl"
                    style="width: 100%; max-height: 40vh;"
                  >
                    <v-img :src="item.image || item.altURL" cover height="20vh" />
                    <v-card-title class="text-center">
                      {{ item.name }}
                    </v-card-title>
                    <v-card-text class="overflow-auto">
                      <strong v-if="item.priceRange">
                        Price Range: {{ item.priceRange }}
                      </strong>
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
  </div>
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
.background {
  background: linear-gradient(132deg, #263238, #000000, #424242);
  background-size: 400% 400%;
  animation: Gradient 10s ease infinite;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0px;
}
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
