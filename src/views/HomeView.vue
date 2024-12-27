<template>
  <v-parallax
    height="90vh"
    gradient="to top right, rgba(33,33,33,.7), rgba(33,33,33,.7)"
    src="/img/background/Parallax.jpg"
  >
    <div class="d-flex flex-column justify-center align-center fill-height">
      <div class="d-flex align-center">
        <div class="text-h2 font-weight-black text-center ml-8">
          LOGECO AUTO SUPPLY
        </div>
        <v-divider
          :thickness="5"
          vertical
          :color="color.secondary"
          class="mx-4 border-opacity-100"
        ></v-divider>
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

  <v-carousel cycle hide-delimiters show-arrows="hover" height="60vh">
    <v-carousel-item
      v-for="(slide, index) in slides"
      :key="index"
      :src="slide.image"
      cover
      gradient="to top right, rgba(0,0,0,.9), rgba(250,250,250,.1)"
    >
      <v-row class="fill-height d-flex justify-start align-center">
        <v-col cols="12" md="4" offset-md="1">
          <v-card variant="tonal" class="pa-4 ma-5" style="border-radius: 40px">
            <v-card-title
              class="text-h4 font-weight-black"
              :style="{ color: color.secondary }"
            >
              {{ slide.title }}
            </v-card-title>

            <v-card-text class="text-h6 font-weight-light">
              {{ slide.description }}
            </v-card-text>

            <v-card-actions>
              <v-btn
                class="rounded-pill px-4"
                :color="color.secondary"
                variant="flat"
                :to="slide.path"
                >{{ slide.buttonName }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>

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
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);
const slides = computed(() => store.getters["homepage/getSlides"]);
const location = computed(() => store.getters["homepage/getLocation"]);
</script>

<style scoped></style>
