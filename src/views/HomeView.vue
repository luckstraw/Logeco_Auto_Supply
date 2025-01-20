<template>
  <!-- eslint-disable -->
  <v-parallax height="90vh" src="/img/background/Parallax.jpg">
    <div class="d-flex justify-center fill-height">
      <div data-aos="fade-down-left" class="custom-top-shape"></div>
      <div data-aos="fade-down-left" class="custom-bot-shape"></div>
      <div data-aos="fade-right" class="left-side d-flex align-center">
        <div class="mx-5">
          <div class="text-subtitle-1 text-red-darken-4 font-weight-black">
            LOGECO AUTO SUPPLY
          </div>
          <v-divider
            class="border-opacity-100"
            :thickness="4"
            color="red-darken-4"
            style="margin-right: 50%"
          ></v-divider>
          <div
            class="text-h4 text-white font-weight-black my-2"
            style="margin-right: 50%"
          >
            Your Trusted Source for Mitsubishi Genuine Parts And Reliable
            Replacements
          </div>
        </div>
      </div>
    </div>
  </v-parallax>
  
      <div height="80vh">
        <div class="d-flex justify-center fill-height">
          <v-img class="imgIn2" src="/img/background/product2.jpeg" cover></v-img>
          <div class="shape-1 d-flex align-center">
              <v-img class="imgIn" src="/img/background/product1.jpg" cover></v-img>
          </div>
        </div>
      </div>

  <v-container class="my-10">
    <v-row class="d-flex justify-space-between align-center">
      <v-col cols="12" md="6" sm="6">
        <iframe
          :src="location.googleMapLink"
          width="100%"
          height="450"
          :style="{
            borderColor: color.secondary,
            borderRadius: '20px',
            borderWidth: '4px',
          }"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </v-col>

      <v-col cols="12" md="6" sm="6" class="d-flex align-center justify-center">
        <v-card
          variant="tonal"
          class="pa-4 ma-5"
          style="border-radius: 40px"
          width="75%"
        >
          <v-card-title
            class="text-h4 font-weight-black"
            :style="{ color: color.secondary }"
            >{{ location.title }}</v-card-title
          >
          <v-card-text class="text-h6 font-weight-light">{{
            location.description
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
/* eslint-disable */
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);
const slides = computed(() => store.getters["homepage/getSlides"]);
const location = computed(() => store.getters["homepage/getLocation"]);
</script>

<style scoped>
.left-side {
  position: relative;
  width: 100%;
  background-color: rgba(33, 33, 33, 0.9);
  clip-path: polygon(0 0, 75% 0, 50% 100%, 0 100%);
  padding: 20px;
  display: flex;
}

.custom-top-shape {
  position: absolute;
  left: 65%;
  width: 15%;
  height: 30%;
  background-color: #b71c1c;
  clip-path: polygon(50% 0%, 100% 0, 50% 100%, 0 100%);
  z-index: 2;
}

.custom-bot-shape {
  position: absolute;
  left: 55%;
  width: 20%;
  height: 50%;
  background-color: #fff;
  clip-path: polygon(60% 0%, 100% 0, 40% 100%, 0 100%);
  z-index: 1;
}

.shape-1 {
    position: relative;
    height: 60vh;
    width: 100%;
    background-color: #b71c1c;
    clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 33% 100%);
    padding: 20px;
    display: flex;
  }

  .imgIn {
    position: absolute;
    height: 60vh;
    width: 100%;
    clip-path: polygon(55% 20%, 90% 20%, 90% 80%, 44% 80%);
    display: flex;
    z-index: 1;
  }

  .imgIn2 {
    position: absolute;
    height: 60vh;
    width: 100%;
    clip-path: polygon(10% 20%, 55% 20%, 44% 80%, 10% 80%);
    display: flex;
    z-index: 1;
  }
</style>
