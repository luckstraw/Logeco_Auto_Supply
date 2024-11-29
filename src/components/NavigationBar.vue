<template>
  <v-app-bar
    app
    :style="{
      borderBottom: `4px solid ${secondaryColor}`,
      '--secondary-color': secondaryColor,
    }"
  >
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

    <router-link to="/" class="text-button">Home</router-link>
    <router-link to="/product" class="text-button">Products</router-link>
    <router-link to="/service" class="text-button">Services</router-link>

    <v-btn
      class="rounded-pill"
      :color="secondaryColor"
      text
      variant="flat"
      style="margin: 0 20px"
      >Login
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const secondaryColor = computed(() =>
  store.getters["colors/getColor"]("secondary")
);
</script>

<style scoped>
.text-button {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  font: inherit;
  margin: 0 15px;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  transition: color 0.3s ease;
  font-weight: bold;
}

.text-button:hover,
.text-button:focus,
.text-button:active {
  color: var(--secondary-color);
}
</style>
