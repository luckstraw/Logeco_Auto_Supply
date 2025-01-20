<template>
  <!-- eslint-disable -->
  <v-parallax
    height="95vh"
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

  <div class="background">
    <div
      class="angled-divider-2 w-100 position-relative"
      :style="{ backgroundColor: color.secondary }"
    ></div>

    <div class="text-center mt-10 mx-5 mb-8">
      <h2 data-aos="fade-up" class="text-h4 font-weight-bold text-red-darken-4">
        More Services
      </h2>
      <p data-aos="fade-up" class="subtitle-1">
        We offer a wide range of services to keep your car in top condition.
      </p>
    </div>
    <v-container class="overflow-auto" :style="{
      height: '70vh',
      scrollbarWidth: 'none',
    }">
    <v-row no-gutters>
      <v-col
        xs="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
        v-for="(card, index) in firstRowCards"
        :key="index"
      >
        <v-card
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          class="pa-2 ma-2 rounded-xl"
          :style="{ border: `1px solid ${color.secondary}`, backgroundImage: card.backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center', }"
        >
          <v-card-title class="text-center">{{ card.title }}</v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              :icon="card.show ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'"
              @click="card.show = !card.show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="card.show">
              <v-divider></v-divider>
              <v-card-text class="text-center">
                {{ card.content }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col
        xs="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
        v-for="(card, index) in secondRowCards"
        :key="index"
      >
        <v-card
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          class="pa-2 ma-2 rounded-xl"
          :style="{ border: `1px solid ${color.secondary}`, backgroundImage: card.backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center',}"
        >
          <v-card-title class="text-center">{{ card.title }}</v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              :icon="card.show ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'"
              @click="card.show = !card.show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="card.show">
              <v-divider></v-divider>
              <v-card-text class="text-center">
                {{ card.content }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col
        xs="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
        v-for="(card, index) in thirdRowCards"
        :key="index"
      >
        <v-card
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          class="pa-2 ma-2 rounded-xl"
          :style="{ border: `1px solid ${color.secondary}`, backgroundImage: card.backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <v-card-title class="text-center">{{ card.title }}</v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              :icon="card.show ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'"
              @click="card.show = !card.show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="card.show">
              <v-divider></v-divider>
              <v-card-text class="text-center">
                {{ card.content }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script setup>
/* eslint-disable */
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);

const services = computed(() => store.getters["adminServices/getServices"]);
const firstRowCards = computed(() => store.getters['serviceView/getRowCards']('firstRowCards'));
const secondRowCards = computed(() => store.getters['serviceView/getRowCards']('secondRowCards'));
const thirdRowCards = computed(() => store.getters['serviceView/getRowCards']('thirdRowCards'));

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
.background {
  background: linear-gradient(132deg, #263238, #000000, #424242);
  background-size: 400% 400%;
  animation: Gradient 10s ease infinite;
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding:0;
  margin:0px;
}
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.angled-divider {
  height: 60px;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
  top: -59.7px;
}
.angled-divider-2 {
  height: 60px;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  top: -0.3px;
}
</style>
