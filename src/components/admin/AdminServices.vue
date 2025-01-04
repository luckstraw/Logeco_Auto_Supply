<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <!-- Existing Services -->
      <v-col v-for="(service, index) in services" :key="index" cols="12" md="4">
        <v-card class="pa-2" elevation="2">
          <!-- Service Image -->
          <v-img :src="service.image" height="200px" class="rounded-t"></v-img>

          <!-- Service Title and Description -->
          <v-card-text class="text-center">
            <h3 class="font-weight-bold">{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </v-card-text>

          <!-- Actions -->
          <v-card-actions class="justify-center">
            <v-btn color="primary" text @click="editService(index)">Edit</v-btn>
            <v-btn color="red" text @click="removeService(index)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Add New Service -->
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
            <h3 class="font-weight-bold">Add New Service</h3>
          </v-card-text>

          <!-- Add Button -->
          <v-card-actions class="justify-center">
            <v-btn color="success" dark large @click="openAddDialog"
              >Add Service</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Service Dialog -->
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="text-h5">
          {{ editingService ? "Edit Service" : "Add New Service" }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newService.title"
                  label="Service Title"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newService.description"
                  label="Service Description"
                  outlined
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newService.image"
                  label="Service Image URL"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="saveService">
            {{ editingService ? "Save Changes" : "Add Service" }}
          </v-btn>
          <v-btn color="red" text @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const dialog = computed(() => store.getters["adminService/getDialogState"]);
const editingService = computed(
  () => store.getters["adminService/getEditingService"]
);
const newService = computed(() => store.getters["adminService/getNewService"]);
const services = computed(() => store.getters["adminService/getServices"]);

const openAddDialog = () => {
  store.dispatch("adminService/openAddDialog");
};

const editService = (index) => {
  store.dispatch("adminService/editService", index);
};

const saveService = () => {
  store.dispatch("adminService/saveService");
};

const removeService = (index) => {
  store.dispatch("adminService/removeService", index);
};

const closeDialog = () => {
  store.dispatch("adminService/closeDialog");
};
</script>

<style scoped>
/* Your styles here */
</style>
