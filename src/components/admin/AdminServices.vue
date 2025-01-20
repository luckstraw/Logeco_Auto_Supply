<template>
  <v-card
    class="rounded-xl overflow-auto"
    variant="flat"
    :style="{
      maxHeight: '88vh',
      backgroundColor: 'transparent',
      scrollbarWidth: 'none',
    }"
  >
    <v-row class="d-flex justify-center align-center ma-0">
      <v-col v-for="service in services" :key="service.id" md="3">
        <v-card class="rounded-xl d-flex flex-column" height="40vh">
          <v-img :src="service.image || service.altURL" cover height="20vh" />
          <v-card-title class="text-center">
            {{ service.name }}
          </v-card-title>
          <v-card-text class="overflow-auto">
            <strong v-if="service.priceRange">
              Price Range: {{ service.priceRange }}
            </strong>
            <br />
            <p>{{ service.description }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn disabled>Edit</v-btn>
            <v-spacer />
            <v-btn :color="color.error" @click="deleteService(service)"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card
          class="rounded-xl d-flex flex-column align-center justify-center hoverCard"
          height="40vh"
          @click="showAddServiceForm = true"
        >
          <v-icon size="120" :color="color.secondary">fa fa-plus</v-icon>
          <div class="text-h5 mt-3">Add Service</div>
        </v-card>
      </v-col>
    </v-row>

    <v-menu
      v-model="showAddServiceForm"
      :close-on-content-click="false"
      location="top center"
      origin="bottom center"
      transition="fab-transition"
      persistent
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="rounded-xl position-sticky"
          :color="color.secondary"
          v-bind="props"
          style="
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
          "
        >
          Add Service
        </v-btn>
      </template>

      <v-card
        width="650"
        class="pa-2 rounded-xl mb-2"
        :style="{ border: `1px solid ${color.secondary}` }"
      >
        <v-card-title class="text-center">Add New Services</v-card-title>
        <v-row class="ma-0 pa-0">
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newService.name"
                  placeholder="Name"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newService.priceRange"
                  placeholder="Price Range"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newService.description"
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
                  v-model="newService.altURL"
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
          <v-col cols="6" class="d-flex flex-column justify-space-between">
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
              <v-btn @click="showAddServiceForm = false">Cancel</v-btn>
              <v-btn :color="color.info" @click="addService">Add</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </v-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const services = computed(() => store.getters["adminServices/getServices"]);

const showAddServiceForm = ref(false);
const newService = ref({
  name: null,
  priceRange: null,
  description: null,
  altURL: null,
  image: null,
});

const addService = () => {
  if (store.dispatch("adminServices/addService", newService.value)) {
    showAddServiceForm.value = false;
    newService.value = {
      name: null,
      priceRange: null,
      description: null,
      altURL: null,
      image: null,
    };
  }
};

const deleteService = (service) => {
  if (!service) return;
  store.dispatch("adminServices/deleteService", service);
};
</script>

<style scoped>
.debug {
  border: 1px solid cyan;
}
.hoverCard {
  transition: transform 0.3s ease;
}
.hoverCard:hover {
  transform: scale(1.05);
}
</style>
