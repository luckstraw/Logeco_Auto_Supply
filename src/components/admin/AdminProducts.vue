<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <!-- Cards with Buttons -->
      <v-col v-for="(card, index) in openCards" :key="index" cols="12" md="4">
        <v-card class="pa-2" elevation="2">
          <!-- Image -->
          <v-img :src="card.image" height="200px" class="rounded-t"></v-img>

          <!-- Title -->
          <v-card-text class="text-center">
            <h3 class="font-weight-bold">{{ card.title }}</h3>
          </v-card-text>

          <!-- Button -->
          <v-card-actions class="justify-center">
            <v-btn color="primary" dark large @click="openDialog">
              {{ card.buttonText }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Add Category Card -->
      <v-col cols="12" md="4">
        <v-card class="pa-2" elevation="2">
          <!-- Placeholder Image -->
          <v-img
            src="https://via.placeholder.com/300x200/CCCCCC"
            height="200px"
            class="rounded-t"
          ></v-img>

          <!-- Title -->
          <v-card-text class="text-center">
            <h3 class="font-weight-bold">Add New Category</h3>
          </v-card-text>

          <!-- Button -->
          <v-card-actions class="justify-center">
            <v-btn color="success" dark large @click="addCategory">
              Add Category
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="800px" persistent>
      <v-card>
        <v-card-title class="text-h5">Item Details</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <!-- Cards Section -->
              <v-col
                v-for="item in items"
                :key="item.title"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card class="pa-2" elevation="2">
                  <v-img
                    :src="item.image"
                    height="150px"
                    class="rounded-t"
                  ></v-img>
                  <v-card-text class="text-center">
                    <h3 class="font-weight-bold">{{ item.title }}</h3>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="red" icon @click="removeItem(item.title)">
                      <v-icon>fa-solid fa-trash-can</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- Add New Section -->
              <v-col
                cols="12"
                md="4"
                class="d-flex align-center justify-center"
              >
                <div class="add-section">
                  <v-btn
                    class="rounded-circle"
                    color="red"
                    dark
                    large
                    fab
                    @click="addItem"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const dialog = computed(() => store.getters["adminProduct/getDialogState"]);
const openCards = computed(() => store.getters["adminProduct/getOpenCards"]);
const items = computed(() => store.getters["adminProduct/getItems"]);

const openDialog = () => {
  store.commit("adminProduct/SET_DIALOG_STATE", true);
};

const closeDialog = () => {
  store.commit("adminProduct/SET_DIALOG_STATE", false);
};

const addItem = () => {
  store.dispatch("adminProduct/addItem");
};

const removeItem = (title) => {
  store.dispatch("adminProduct/removeItem", title);
};

const addCategory = () => {
  store.dispatch("adminProduct/addCategory");
};
</script>

<style scoped>
.add-section {
  background: rgba(0, 0, 0, 0.5);
  padding: 50px;
  border-radius: 10px;
}
</style>
