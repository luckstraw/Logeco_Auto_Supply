<template>
  <v-card
    class="d-flex flex-column justify-center align-center rounded-xl pa-2"
    style="height: 30vh"
  >
    <div
      class="position-absolute top-0 w-100 h-50"
      :style="{ backgroundColor: `${color.secondary}` }"
    ></div>

    <v-avatar
      :image="user?.photoURL"
      :size="$vuetify.display.xs ? '100' : '130'"
      :style="{ border: `5px solid ${color.secondary}` }"
    />

    <div class="text-center text-md-h5 text-subtitle-1 font-weight-bold mt-4">
      {{ user?.displayName }}
    </div>

    <v-btn
      class="position-absolute top-0 right-0 mt-2 mr-2"
      icon="fa-solid fa-arrow-right-from-bracket"
      rounded="xl"
      :size="$vuetify.display.xs ? 'small' : 'default'"
      :color="color.accent"
      variant="flat"
      style="z-index: 1"
      @click="handleLogout"
    />
  </v-card>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const color = computed(() => store.getters["adminSettings/getColor"]);
const user = computed(() => store.getters["authentication/getUser"]);

const handleLogout = () => store.dispatch("authentication/signOut");
</script>

<style scoped></style>
