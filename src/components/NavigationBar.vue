<template>
  <v-app-bar app :style="{ borderBottom: `4px solid ${primaryColor}` }">
    <v-toolbar-title>
      <router-link to="/" style="cursor: pointer">
        <v-img
          :width="275"
          aspect-ratio="16/9"
          cover
          src="@/assets/LogecoLogo.png"
          style="margin-left: 20px"
        ></v-img>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      class="rounded-pill"
      :color="primaryColor"
      text
      variant="flat"
      style="margin-right: 20px"
      >Login
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const primaryColor = computed(() =>
  store.getters["colors/getColor"]("primary")
);
</script>

<style scoped></style>
