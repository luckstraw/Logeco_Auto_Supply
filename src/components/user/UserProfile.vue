<template>
  <!-- eslint-disable -->
  <v-card
  class="d-flex flex-column align-center rounded-xl pa-4"
  style="flex: 3; position: relative; overflow: hidden;"
>
  <div
    style="
      position: absolute;
      top: 0;
      width: 100%;
      height: 50%;
      background-color: #B71C1C; 
    "
  ></div>
  <v-avatar
    z-index="1"
    :image="user.photoURL"
    size="16vh"
    :style="{ border: `5px solid ${color.secondary}` }"
    class="mb-1 mt-2"
    style="z-index: 2; position: relative;"
  ></v-avatar>
  <h3 class="text-center mb-1">
    {{ user.displayName }}
  </h3>

  <v-btn
    icon="fa-solid fa-arrow-right-from-bracket"
    rounded="xl"
    :color="color.secondary"
    @click="handleLogout"
    size="x-small"
    style="z-index: 2; position: relative;"
  >
  </v-btn>
</v-card>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const color = computed(() => store.getters["adminSettings/getColor"]);
const user = computed(() => store.getters["authentication/getUser"]);

const handleLogout = async () => store.dispatch("authentication/signOut");
</script>

<style scoped></style>
