<template>
  <div class="d-flex flex-row" style="height: 88vh">
    <!-- Category Card-->
    <v-expand-x-transition>
      <v-card
        v-show="!selectedCategory"
        class="fill-height overflow-auto rounded-xl"
        variant="flat"
        :style="{
          maxHeight: '88vh',
          backgroundColor: 'transparent',
          scrollbarWidth: 'none',
          border: `1px solid ${color.secondary}`,
        }"
      >
        <!-- NavBar -->
        <v-card
          class="d-flex justify-space-between align-center top-0 position-sticky pa-5"
          :style="{
            zIndex: '1',
            borderBottom: `1px solid ${color.secondary}`,
          }"
        >
          <span class="text-h3">Categories</span>

          <v-menu
            v-model="showAddCategoryForm"
            :close-on-content-click="false"
            location="bottom start"
            origin="end top"
            transition="fab-transition"
          >
            <template v-slot:activator="{ props }">
              <v-btn class="rounded-xl" :color="color.secondary" v-bind="props">
                Add Categories
              </v-btn>
            </template>

            <v-card
              width="650"
              class="pa-2 rounded-xl"
              :style="{ border: `1px solid ${color.secondary}` }"
            >
              <v-card-title class="text-center"
                >Add New Categories</v-card-title
              >
              <v-row class="ma-0 pa-0">
                <v-col cols="6">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newCategory.name"
                        placeholder="Name"
                        density="compact"
                        variant="outlined"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="newCategory.description"
                        placeholder="Description"
                        density="compact"
                        variant="outlined"
                        hide-details
                        rows="3"
                        max-rows="3"
                        no-resize
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="newCategory.altURL"
                        placeholder="Alternative URL photo"
                        density="compact"
                        variant="outlined"
                        hide-details
                        rows="2"
                        max-rows="2"
                        no-resize
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="6"
                  class="d-flex flex-column justify-space-between"
                >
                  <div>Upload a photo:</div>
                  <v-file-upload
                    density="comfortable"
                    icon="fa-solid fa-file-arrow-up"
                    title="Drag and Drop Here"
                    height="160"
                    disabled
                  />
                  <v-card-actions class="ma-0 pa-0">
                    <v-spacer />
                    <v-btn @click="showAddCategoryForm = false">Cancel</v-btn>
                    <v-btn :color="color.info" @click="addCategory">Add</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-menu>
        </v-card>
        <!-- Grids -->
        <v-row class="d-flex justify-center align-center ma-0">
          <v-col v-for="category in categories" :key="category.id" md="3">
            <v-card
              class="rounded-xl hoverCard"
              height="33vh"
              @click="selectedCategory = category"
            >
              <v-img
                :src="
                  category.image ||
                  category.altURL ||
                  'https://placehold.co/600x400?text=No+Image'
                "
                cover
                height="25vh"
              />
              <v-card-title
                class="text-center text-md-subtitle-1 font-weight-bold"
              >
                {{ category.name }}
                <v-icon
                  class="position-absolute cursor-pointer"
                  style="right: 10px; bottom: 20px"
                  :color="color.error"
                  @click.stop="deleteCategory(category)"
                >
                  fa-regular fa-trash-can
                </v-icon>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card
              class="rounded-xl d-flex flex-column align-center justify-center hoverCard"
              height="33vh"
              @click="showAddCategoryForm = true"
            >
              <v-icon size="120" :color="color.secondary">fa fa-plus</v-icon>
              <div class="text-h5 mt-3">Add Category</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-expand-x-transition>

    <!-- Item Card-->
    <v-expand-x-transition>
      <v-card
        v-show="selectedCategory"
        class="fill-height rounded-xl w-100"
        variant="flat"
        :style="{
          maxHeight: '88vh',
          backgroundColor: 'transparent',
          border: `1px solid ${color.secondary}`,
        }"
      >
        <v-row class="ma-0 fill-height">
          <!-- Info About Selected Category -->
          <v-col md="3" class="pa-0">
            <v-card
              class="d-flex flex-column"
              :style="{
                borderRight: `1px solid ${color.secondary}`,
                height: '88vh',
              }"
            >
              <v-img
                :src="
                  selectedCategory?.image ||
                  selectedCategory?.altURL ||
                  'https://placehold.co/600x400?text=No+Image'
                "
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
                <v-btn disabled>Edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- NavBar with Grids of Items -->
          <v-col md="9" class="ma-0 pa-0">
            <v-card
              class="fill-height overflow-auto pa-0"
              :style="{
                maxHeight: '88vh',
                backgroundColor: 'transparent',
                scrollbarWidth: 'none',
              }"
            >
              <v-card
                class="d-flex justify-space-between align-center top-0 position-sticky pa-5"
                :style="{
                  zIndex: '1',
                  borderBottom: `1px solid ${color.secondary}`,
                }"
              >
                <span class="text-h4">Items</span>

                <v-menu
                  v-model="showAddItemForm"
                  :close-on-content-click="false"
                  location="bottom start"
                  origin="end top"
                  transition="fab-transition"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      class="rounded-xl"
                      :color="color.secondary"
                      v-bind="props"
                    >
                      Add Items
                    </v-btn>
                  </template>

                  <v-card
                    width="650"
                    class="pa-2 rounded-xl"
                    :style="{ border: `1px solid ${color.secondary}` }"
                  >
                    <v-card-title class="text-center"
                      >Add New Items</v-card-title
                    >
                    <v-row class="ma-0 pa-0">
                      <v-col cols="6">
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="newItem.name"
                              placeholder="Name"
                              density="compact"
                              variant="outlined"
                              hide-details
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="newItem.priceRange"
                              placeholder="Price Range"
                              density="compact"
                              variant="outlined"
                              hide-details
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              v-model="newItem.description"
                              placeholder="Description"
                              density="compact"
                              variant="outlined"
                              hide-details
                              rows="3"
                              max-rows="3"
                              no-resize
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              v-model="newItem.altURL"
                              placeholder="Alternative URL photo"
                              density="compact"
                              variant="outlined"
                              hide-details
                              rows="2"
                              max-rows="2"
                              no-resize
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col
                        cols="6"
                        class="d-flex flex-column justify-space-between"
                      >
                        <div>Upload a photo:</div>
                        <v-file-upload
                          density="comfortable"
                          icon="fa-solid fa-file-arrow-up"
                          title="Drag and Drop Here"
                          height="200"
                          disabled
                        />
                        <v-card-actions class="ma-0 pa-0">
                          <v-spacer />
                          <v-btn @click="showAddItemForm = false">Cancel</v-btn>
                          <v-btn :color="color.info" @click="addItem"
                            >Add</v-btn
                          >
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-menu>
              </v-card>

              <v-row class="d-flex justify-center align-center ma-0">
                <v-col v-for="item in categoryItems" :key="item.id" md="4">
                  <v-card class="d-flex flex-column rounded-xl" height="40vh">
                    <v-img
                      :src="
                        item.image ||
                        item.altURL ||
                        'https://placehold.co/600x400?text=No+Image'
                      "
                      cover
                      height="48%"
                    />
                    <v-card-title
                      class="text-center text-md-subtitle-1 font-weight-bold"
                    >
                      {{ item.name }}
                    </v-card-title>
                    <v-card-text class="overflow-auto">
                      <strong v-if="item.priceRange"
                        >Price Range: {{ item.priceRange }}</strong
                      >
                      <br />

                      <div class="text-md-subtitle-2">
                        {{ item.description }}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn disabled>Edit</v-btn>
                      <v-spacer />
                      <v-btn :color="color.error" @click="deleteItem(item)"
                        >Delete</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col md="4">
                  <v-card
                    class="rounded-xl d-flex flex-column align-center justify-center hoverCard"
                    height="40vh"
                    @click="showAddItemForm = true"
                  >
                    <v-icon size="120" :color="color.secondary"
                      >fa fa-plus</v-icon
                    >
                    <div class="text-h5 mt-3">Add Items</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-expand-x-transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const categories = computed(() => store.getters["adminProducts/getCategories"]);
const selectedCategory = ref(null);
const categoryItems = computed(() => {
  if (!selectedCategory.value) return [];
  return store.getters["adminProducts/getItemsByCategory"](
    selectedCategory.value.id
  );
});

const showAddCategoryForm = ref(false);
const newCategory = ref({
  name: null,
  description: null,
  altURL: null,
  image: null,
});

const addCategory = async () => {
  if (await store.dispatch("adminProducts/addCategory", newCategory.value)) {
    showAddCategoryForm.value = false;
    newCategory.value = {
      name: null,
      description: null,
      altURL: null,
      image: null,
    };
  }
};

const deleteCategory = (category) =>
  store.dispatch("adminProducts/deleteCategory", category);

const showAddItemForm = ref(false);
const newItem = ref({
  name: null,
  priceRange: null,
  description: null,
  altURL: null,
  image: null,
});

const addItem = () => {
  if (!selectedCategory.value) return;

  if (
    store.dispatch("adminProducts/addItem", {
      categoryId: selectedCategory.value.id,
      itemData: newItem.value,
    })
  ) {
    showAddItemForm.value = false;
    newItem.value = {
      name: null,
      priceRange: null,
      description: null,
      altURL: null,
      image: null,
    };
  }
};

const deleteItem = (item) => {
  if (!selectedCategory.value || !item.id) return;
  store.dispatch("adminProducts/deleteItem", {
    categoryId: selectedCategory.value.id,
    itemId: item.id,
  });
};
</script>

<style scoped>
.hoverCard {
  transition: transform 0.3s ease;
}
.hoverCard:hover {
  transform: scale(1.05);
}
</style>
