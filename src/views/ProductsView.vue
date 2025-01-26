<template>
  <div class="background">
    <v-card
      v-show="$vuetify.display.xs && selectedCategory"
      :style="{
        height: '20vh',
        width: '100%',
        borderBottom: `2px solid ${color.secondary}`,
        position: `sticky`,
        top: '7vh',
        zIndex: 1,
      }"
    >
      <div class="title-overlay" style="height: 100%">
        <div class="position-absolute top-0 left-0 ml-2 mt-2">
          <v-icon @click="selectedCategory = null"
            >fa-solid fa-arrow-left</v-icon
          >
        </div>
        <div class="text-h5 font-weight-bold">
          {{ selectedCategory?.name }}
        </div>
        <div
          class="text-caption overflow-auto mx-2 text-center"
          style="max-height: 50%"
        >
          {{ selectedCategory?.description }}
        </div>
      </div>
      <v-img
        :src="selectedCategory?.image || selectedCategory?.altURL"
        cover
        height="100%"
      />
    </v-card>

    <v-container>
      <!--Category Card-->
      <v-row v-show="!selectedCategory" class="ma-0" justify="center">
        <!--Mitsubhishi Card-->
        <v-col v-if="mitsubishiCategory" cols="12" md="8">
          <v-card
            data-aos="zoom-in-up"
            class="rounded-xl position-relative"
            :style="{
              border: `2px solid ${color.secondary}`,
              height: $vuetify.display.xs ? '30vh' : '63vh',
            }"
            @click="
              () => {
                selectedCategory = mitsubishiCategory;
                scrollToTop();
              }
            "
          >
            <div
              class="title-overlay"
              :style="{ height: $vuetify.display.xs ? '23%' : '15%' }"
            >
              <div
                data-aos="fade-right"
                class="text-md-h4 text-h5 font-weight-bold"
              >
                {{ mitsubishiCategory?.name }}
              </div>
            </div>
            <v-img
              :src="mitsubishiCategory?.image || mitsubishiCategory?.altURL"
              cover
              height="100%"
            />
          </v-card>
        </v-col>

        <!--Two Helper For Mitsubishi-->
        <v-col cols="12" md="4">
          <v-row>
            <v-col
              v-for="category in firstTwoCategories"
              :key="category?.id"
              cols="12"
            >
              <v-card
                data-aos="fade-left"
                class="rounded-xl position-relative"
                :style="{
                  border: `2px solid ${color.secondary}`,
                  height: '30vh',
                }"
                @click="
                  () => {
                    selectedCategory = category;
                    scrollToTop();
                  }
                "
              >
                <div class="title-overlay" style="height: 23%">
                  <div class="text-h5 font-weight-bold">
                    {{ category?.name }}
                  </div>
                </div>
                <v-img
                  :src="category?.image || category?.altURL"
                  cover
                  height="100%"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!--Remaining Categories-->
        <v-col
          v-for="(category, index) in remainingCategories"
          :key="category?.id"
          md="4"
          cols="12"
        >
          <v-card
            :data-aos="
              index % 3 === 0
                ? 'fade-up-right'
                : index % 3 === 2
                ? 'fade-up-left'
                : 'fade-up'
            "
            data-aos-anchor-placement="bottom-bottom"
            class="rounded-xl position-relative"
            :style="{ border: `2px solid ${color.secondary}`, height: '30vh' }"
            @click="
              () => {
                selectedCategory = category;
                scrollToTop();
              }
            "
          >
            <div class="title-overlay" style="height: 23%">
              <div class="text-h5 font-weight-bold">
                {{ category?.name }}
              </div>
            </div>
            <v-img
              :src="category?.image || category?.altURL"
              cover
              height="100%"
            />
          </v-card>
        </v-col>
      </v-row>

      <!--Item Card-->
      <v-row v-show="selectedCategory" class="ma-0">
        <v-col cols="12" md="4" v-show="!$vuetify.display.xs">
          <v-card
            class="rounded-xl d-flex flex-column"
            :style="{
              height: '85vh',
              border: `2px solid ${color.secondary}`,
              position: `sticky`,
              top: '12vh',
            }"
          >
            <v-img
              :src="selectedCategory?.image || selectedCategory?.altURL"
              cover
              height="70%"
            />
            <v-card-title class="text-center">{{
              selectedCategory?.name
            }}</v-card-title>
            <v-card-text class="overflow-auto">{{
              selectedCategory?.description
            }}</v-card-text>
            <v-card-actions>
              <v-btn
                @click="
                  () => {
                    selectedCategory = null;
                    scrollToTop();
                  }
                "
                >Back</v-btn
              >
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <v-row justify="center">
            <v-col
              cols="12"
              md="12"
              class="pa-2"
              :style="{
                position: 'sticky',
                top: $vuetify.display.xs ? '27vh' : '12vh',
                zIndex: 2,
              }"
            >
              <v-card
                class="rounded-xl"
                :style="{ border: `2px solid ${color.secondary}` }"
              >
                <v-text-field
                  v-model="searchQuery"
                  :color="color.secondary"
                  density="comfortable"
                  variant="solo"
                  placeholder="Search Item"
                  prepend-inner-icon="fa-solid fa-search"
                  hide-details
                  class="px-2"
                />
              </v-card>
            </v-col>

            <v-col
              v-if="filteredItems.length === 0"
              :style="{ height: $vuetify.display.xs ? '30vh' : '85vh' }"
              class="d-flex align-center justify-center"
            >
              <span class="text-h5 text-grey">
                No items available in this category
              </span>
            </v-col>

            <v-col
              cols="12"
              md="6"
              v-for="(item, index) in filteredItems"
              :key="item.id"
            >
              <v-card
                :data-aos="
                  index % 2 === 0 ? 'fade-down-right' : 'fade-down-left'
                "
                data-aos-anchor-placement="bottom-bottom"
                class="rounded-xl"
                :style="{
                  height: '30vh',
                  border: `2px solid ${color.secondary}`,
                }"
              >
                <div class="description-overlay" style="height: 100%">
                  <div class="text-h5 font-weight-bold">
                    {{ item.name }}
                  </div>
                  <div
                    v-if="item.priceRange"
                    class="font-weight-bold text-caption"
                  >
                    Price Range: {{ item.priceRange }}
                  </div>
                  <div
                    class="text-caption text-center mx-7 overflow-auto"
                    style="max-height: 50%; scrollbar-width: none"
                  >
                    {{ item.description }}
                  </div>
                </div>
                <v-img :src="item.image || item.altURL" cover height="100%" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const searchQuery = ref("");

const filteredItems = computed(() => {
  if (!searchQuery.value) return categoryItems.value;

  return categoryItems.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectedCategory = ref(null);
const categories = computed(() => store.getters["adminProducts/getCategories"]);

const nonMitsubishiCategories = computed(() =>
  categories.value.filter((cat) => cat.name !== "Mitsubishi")
);

const firstTwoCategories = computed(() =>
  nonMitsubishiCategories.value.slice(0, 2)
);

const remainingCategories = computed(() =>
  nonMitsubishiCategories.value.slice(2)
);

const mitsubishiCategory = computed(() =>
  categories.value.find((cat) => cat.name === "Mitsubishi")
);

const categoryItems = computed(() => {
  if (!selectedCategory.value) return [];
  return store.getters["adminProducts/getItemsByCategory"](
    selectedCategory.value.id
  );
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.title-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
.description-overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.background {
  background: linear-gradient(132deg, #263238, #000000, #424242);
  background-size: 400% 400%;
  animation: Gradient 10s ease infinite;
  position: relative;
  width: 100%;
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
