<template>
  <v-parallax
    height="90vh"
    gradient="to top right, rgba(33,33,33,.7), rgba(33,33,33,.7)"
    src="/img/background/parallax.jpg"
  >
    <div class="d-flex flex-column justify-center align-center fill-height">
      <div class="d-flex align-center">
        <!-- Main Heading -->
        <div class="text-h2 font-weight-black text-center ml-8">
          LOGECO AUTO SUPPLY
        </div>

        <!-- Vertical Divider -->
        <v-divider
          :thickness="5"
          vertical
          :color="color.secondary"
          class="mx-4 border-opacity-100"
        ></v-divider>

        <!-- Subheading -->
        <div
          class="text-h4 font-weight-bold mr-8"
          :style="{ color: color.secondary }"
        >
          Your Trusted Source for Mitsubishi Genuine Parts And Reliable
          Replacements
        </div>
      </div>
    </div>
  </v-parallax>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);
</script>

<style></style>
