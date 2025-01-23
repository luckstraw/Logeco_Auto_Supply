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
      height: 45%;
      background-color: #673AB7; 
    "
  ></div>
  <!-- Profile content -->
  <v-avatar
    z-index="1"
    :image="user.photoURL"
    size="13vh"
    :style="{ border: `2px solid ${color.secondary}` }"
    class="mb-1 mt-6"
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

const color = computed(() => store.getters["colors/getColor"]);
const user = computed(() => store.getters["authentication/getUser"]);

const handleLogout = async () => store.dispatch("authentication/signOut");
</script>

<style scoped></style>
