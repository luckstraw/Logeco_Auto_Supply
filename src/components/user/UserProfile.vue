<template>
  <v-card
    class="d-flex flex-row justify-center align-center rounded-xl pa-2"
    style="flex: 3"
  >
    <v-avatar
      :image="user.photoURL"
      size="100"
      :style="{ border: `2px solid ${color.secondary}` }"
      class="mr-5"
    ></v-avatar>

    <div class="d-flex flex-column">
      <h3>{{ user.displayName }}</h3>
      <button @click="handleLogout">Logout</button>
    </div>
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
