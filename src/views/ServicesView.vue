<template>
  <v-parallax
    height="90vh"
    gradient="to top right, rgba(0,0,0,.9), rgba(250,250,250,.1)"
    src="/img/background/backgroundService.jpg"
  >
    <v-container class="fill-height" style="z-index: 1">
      <v-row class="d-flex align-center fill-height">
        <v-col cols="12" md="6">
          <div data-aos="fade-up" class="text-h2 text-white font-weight-black">
            Seamless Service, Trusted Care!
          </div>
          <div
            data-aos="fade-up"
            class="text-subtitle-1 text-white font-weight-light mt-2"
          >
            Experience hassle-free auto repairs and maintenance that put you
            back on the road with confidence.
          </div>
          <v-btn
            data-aos="fade-up"
            color="red-darken-4"
            rounded="xl"
            append-icon="fa-solid fa-arrow-right"
            class="white mt-4"
          >
            Book Your Service!
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div
      class="angled-divider w-100 position-relative"
      :style="{ backgroundColor: color.secondary }"
    ></div>
  </v-parallax>
  <v-container class="pa-0" fluid>
    <v-row no-gutters>
      <v-col
        v-for="service in topServices"
        :key="service.icon"
        cols="12"
        md="4"
        :style="columnStyle"
      >
        <v-icon
          :icon="service.icon"
          data-aos="fade-right"
          size="80"
          class="mb-12 mt-4"
        />
        <h3 data-aos="fade-right" class="mb-3">{{ service.title }}</h3>
        <p data-aos="fade-right">{{ service.description }}</p>
      </v-col>
    </v-row>
  </v-container>
  <div
    class="angled-divider-2 w-100 position-relative"
    :style="{ backgroundColor: color.secondary }"
  ></div>

  <div class="text-center mt-10 mx-5">
    <h2 data-aos="fade-up" class="text-h4 font-weight-bold text-red-darken-4">
      More Services
    </h2>
    <p data-aos="fade-up" class="subtitle-1">
      We offer a wide range of services to keep your car in top condition.
    </p>
  </div>

  <v-container class="pa-0 my-5" data-aos="fade-up">
    <v-carousel show-arrows="hover" hide-delimiters height="50vh" cycle>
      <v-carousel-item v-for="service in services" :key="service.id">
        <div class="d-flex flex-row fill-height">
          <div style="flex: 4">
            <v-img
              :src="service.image || service.altURL"
              cover
              class="fill-height rounded-xl elevation-2"
            />
          </div>
          <div style="flex: 8" class="d-flex flex-column justify-center">
            <div
              class="text-h5 font-weight-bold ml-16"
              :style="{ color: color.secondary }"
            >
              {{ service.name }}
            </div>
            <div class="subtitle-2 ml-16">
              {{ service.description }}
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);

const services = computed(() => store.getters["adminServices/getServices"]);

const topServices = [
  {
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Car Diagnostics",
    description:
      "Diagnose your car issues quickly with our advanced tools and professional technicians.",
  },
  {
    icon: "fa-solid fa-droplet",
    title: "Oil Change Service",
    description:
      "Keep your engine running smoothly with our high-quality oil change service.",
  },
  {
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Engine Tuning",
    description:
      "Optimize your car's performance with our expert engine tuning services.",
  },
];

const columnStyle = computed(() => ({
  backgroundColor: color.value.secondary,
  color: "white",
  textAlign: "center",
  padding: "40px",
  minHeight: "30vh",
}));
</script>

<style scoped>
.angled-divider {
  height: 60px;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
  top: -59.9px;
}
.angled-divider-2 {
  height: 60px;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  top: -0.3px;
}
</style>
