<template>
  <v-parallax
    height="450"
    gradient="to top right, rgba(0,0,0,.9), rgba(250,250,250,.1)"
    src="/MechanicalBoy.jpg"
  >
    <v-container class="fill-height" style="z-index: 1">
      <v-row class="d-flex align-center fill-height">
        <v-col cols="12" md="6">
          <div class="text-h2 text-white font-weight-black">
            Seamless Service, Trusted Care!
          </div>
          <div class="text-subtitle-1 text-white font-weight-light mt-2">
            Experience hassle-free auto repairs and maintenance that put you
            back on the road with confidence.
          </div>
          <v-row class="mt-4">
            <v-col cols="auto">
              <v-btn
                color="red-darken-4"
                rounded="xl"
                append-icon="fa-solid fa-arrow-right"
                class="white"
              >
                Book Your Service!
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
  <v-container class="pa-0" fluid>
    <v-row no-gutters>
      <!-- Section 1 -->
      <v-col
        cols="12"
        sm="4"
        style="
          background-color: #616161;
          color: white;
          text-align: center;
          padding: 40px;
          min-height: 50vh; /* Adjust height dynamically based on viewport */
        "
      >
        <v-icon size="80" color="darkred" class="mb-12 mt-4"
          >fa-solid fa-screwdriver-wrench</v-icon
        >
        <h3 class="mb-3">Car Diagnostics</h3>
        <p>
          Diagnose your car issues quickly with our advanced tools and
          professional technicians.
        </p>
      </v-col>

      <!-- Section 2 -->
      <v-col
        cols="12"
        sm="4"
        style="
          background-color: #424242;
          color: white;
          text-align: center;
          padding: 40px;
          min-height: 30vh; /* Adjust height dynamically based on viewport */
        "
      >
        <v-icon size="80" color="darkred" class="mb-12 mt-4"
          >fa-solid fa-droplet</v-icon
        >
        <h3 class="mb-3">Oil Change Service</h3>
        <p>
          Keep your engine running smoothly with our high-quality oil change
          service.
        </p>
      </v-col>

      <!-- Section 3 -->
      <v-col
        cols="12"
        sm="4"
        style="
          background-color: #212121;
          color: white;
          text-align: center;
          padding: 40px;
          min-height: 30vh; /* Adjust height dynamically based on viewport */
        "
      >
        <v-icon size="80" color="darkred" class="mb-12 mt-4"
          >fa-solid fa-gears</v-icon
        >
        <h3 class="mb-3">Engine Tuning</h3>
        <p>
          Optimize your car's performance with our expert engine tuning
          services.
        </p>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="text-h4 font-weight-bold text-red-darken-4">
          More Services
        </h2>
        <p class="subtitle-1">
          We offer a wide range of services to keep your car in top condition.
        </p>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <!-- Carousel Section -->
    <v-row>
      <v-carousel
        show-arrows="hover"
        hide-delimiters
        class="elevation-0 mt-2"
        height="350px"
        cycle
      >
        <v-carousel-item v-for="(item, index) in items" :key="index">
          <v-row align="center" justify="center">
            <v-col cols="12" md="4">
              <v-img
                :src="item.src || 'https://via.placeholder.com/300x300'"
                :alt="item.description"
                contain
                height="300px"
                width="100%"
                class="elevation-2"
              ></v-img>
            </v-col>
            <v-col cols="12" md="8" class="text-left">
              <h3
                class="text-h5 font-weight-bold text-red-darken-4"
                style="margin-left: 16px"
              >
                {{ item.title }}
              </h3>
              <p class="subtitle-2" style="margin-left: 16px">
                {{ item.description }}
              </p>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const items = computed(() => store.getters["serviceView/getItems"]);
</script>

<style scoped>
.text-center {
  text-align: center;
}
.elevation-2 {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
