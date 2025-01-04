<template>
  <div class="background">
    <v-container>
      <v-row>
        <!-- Top Row: Mitsubishi (Large Card) -->
        <v-col cols="12" md="8">
          <v-card
            @click="
              openDialog(
                'Mitsubishi Genuine Parts',
                productGroups.mitsubishiProducts
              )
            "
            class="clickable-card"
          >
            <v-img :src="images.mitsubishi" height="300px" contain></v-img>
            <v-card-title class="text-h5"
              >Mitsubishi Genuine Parts</v-card-title
            >
          </v-card>
        </v-col>

        <!-- Top Row: Placeholder Tall Card -->
        <v-col cols="12" md="4">
          <v-card
            @click="openDialog('Product 2', productGroups.product2Products)"
            class="clickable-card"
          >
            <v-img :src="images.placeholder" height="300px" contain></v-img>
            <v-card-title class="text-h5">Product 2</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <!-- Bottom Row: Three Equal Cards -->
        <v-col cols="12" md="4">
          <v-card
            @click="openDialog('Product 3', productGroups.product3Products)"
            class="clickable-card"
          >
            <v-img :src="images.placeholder" height="200px" contain></v-img>
            <v-card-title class="text-h5">Product 3</v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            @click="openDialog('Honda', productGroups.hondaProducts)"
            class="clickable-card"
          >
            <v-img :src="images.honda" height="200px" contain></v-img>
            <v-card-title class="text-h5">HONDA</v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            @click="openDialog('Product 5', productGroups.product5Products)"
            class="clickable-card"
          >
            <v-img :src="images.placeholder" height="200px" contain></v-img>
            <v-card-title class="text-h5">Product 5</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <!-- Product Dialog -->
      <v-dialog v-model="dialogState.dialog" max-width="900px" persistent>
        <v-card>
          <v-card-title class="text-h5">{{
            dialogState.selectedTitle
          }}</v-card-title>
          <v-divider></v-divider>

          <!-- Tabs Integration -->
          <v-tabs
            v-model="dialogState.tab"
            align-tabs="center"
            color="red-darken-4"
          >
            <v-tab :value="1">Tires</v-tab>
            <v-tab :value="2">Belt</v-tab>
            <v-tab :value="3">Battery</v-tab>
            <v-tab :value="4">Oils</v-tab>
          </v-tabs>

          <!-- Product Content -->
          <div class="scrollable-content">
            <v-tabs-window v-model="dialogState.tab">
              <v-tabs-window-item
                v-for="(productGroup, index) in dialogState.products"
                :key="index"
                :value="index + 1"
              >
                <v-container fluid>
                  <v-row>
                    <v-col
                      v-for="product in productGroup"
                      :key="product.name"
                      cols="12"
                      md="4"
                    >
                      <v-card class="product-card">
                        <v-img :src="product.image" height="205" cover></v-img>
                        <v-card-text class="text-center">{{
                          product.name
                        }}</v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tabs-window-item>
            </v-tabs-window>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="closeDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const dialogState = computed(
  () => store.getters["productsView/getDialogState"]
);
const images = computed(() => store.getters["productsView/getImages"]);
const productGroups = computed(
  () => store.getters["productsView/getProductGroups"]
);

const openDialog = (title, productGroup) => {
  store.dispatch("productsView/openDialog", { title, productGroup });
};

const closeDialog = () => {
  store.dispatch("productsView/closeDialog");
};
</script>

<style scoped>
.background {
  padding-top: 16px;
  background-size: cover;
  height: 100%;
  min-height: 100vh;
}

.scrollable-content {
  max-height: 400px;
  overflow-y: auto;
}

.clickable-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.clickable-card:hover {
  transform: scale(1.05);
}
.product-card {
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
</style>
