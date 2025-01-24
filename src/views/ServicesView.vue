<template>
  <!--First Section-->
  <v-parallax
    height="90vh"
    gradient="to top right, rgba(0,0,0,.9), rgba(250,250,250,.1)"
    :src="serviceSettings.mainPhoto"
  >
    <v-container class="fill-height">
      <v-row>
        <v-col
          data-aos="fade-up"
          data-aos-duration="1000"
          cols="12"
          md="6"
          sm="6"
        >
          <div class="text-md-h2 text-h3 font-weight-black">
            Seamless Service, Trusted Care!
          </div>
          <div class="text-md-h6 text-subtitle-1 font-weight-light">
            Experience hassle-free auto repairs and maintenance that put you
            back on the road with confidence.
          </div>
          <v-btn
            class="rounded-xl mt-2"
            :color="color.secondary"
            append-icon="fa-solid fa-arrow-right"
            :size="$vuetify.display.smAndDown ? 'small' : 'default'"
            @click="
              () => (user ? $router.push('/users') : showLoginSignUpForm())
            "
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

  <!--Second Section-->
  <v-container class="pa-0" fluid>
    <v-row no-gutters class="ma-0">
      <v-col
        class="text-center pa-10"
        v-for="service in topServices"
        :key="service.icon"
        cols="12"
        md="4"
        :style="{ backgroundColor: `${color.secondary}`, minHeight: '30vh' }"
      >
        <v-icon
          :icon="service.icon"
          data-aos="fade-right"
          size="80"
          class="mb-12 mt-4"
        />
        <h3 data-aos="fade-left" class="mb-3">{{ service.title }}</h3>
        <p data-aos="fade-left">{{ service.description }}</p>
      </v-col>
    </v-row>
  </v-container>

  <!--Third Section-->
  <div class="background">
    <div
      class="angled-divider-2 w-100 position-relative"
      :style="{ backgroundColor: color.secondary }"
    ></div>

    <div class="text-center mt-10 mx-5 mb-8">
      <div
        data-aos="fade-up"
        class="text-h4 text-md-h3 font-weight-bold text-red-darken-4"
      >
        More Services
      </div>
      <div data-aos="fade-up" class="text-subtitle-1 text-md-h6">
        We offer a wide range of services to keep your car in top condition.
      </div>
    </div>

    <v-container>
      <v-row no-gutters justify="center">
        <v-col
          v-for="(service, index) in services"
          :key="service.id"
          xs="12"
          sm="6"
          :md="index % 5 < 2 ? 6 : 4"
          :lg="index % 5 < 2 ? 6 : 4"
          :xl="index % 5 < 2 ? 6 : 4"
        >
          <v-card
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            class="pa-2 ma-2 rounded-xl"
            :style="{
              border: `2px solid ${color.secondary}`,
              backgroundImage: `url(${service.image || service.altURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <v-card-title class="text-center text-overlay rounded-lg">{{
              service.name
            }}</v-card-title>
            <v-card-actions class="d-flex justify-center">
              <v-icon
                v-if="service.description || service.priceRange"
                :class="
                  showDetails[service.id]
                    ? 'fa-solid fa-arrow-up'
                    : 'fa-solid fa-arrow-down'
                "
                :color="color.secondary"
                @click="showDetails[service.id] = !showDetails[service.id]"
                style="cursor: pointer"
              />
            </v-card-actions>

            <v-expand-transition>
              <div v-show="showDetails[service.id]">
                <v-divider
                  :color="color.secondary"
                  class="border-opacity-100"
                />
                <v-card-text class="text-center text-overlay rounded-lg">
                  <strong v-if="service.priceRange">
                    Price Range: {{ service.priceRange }}
                    <br />
                  </strong>
                  {{ service.description }}
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
import { computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);
const user = computed(() => store.getters["authentication/getUser"]);

const serviceSettings = computed(
  () => store.getters["adminSettings/getService"]
);
const services = computed(() => store.getters["adminServices/getServices"]);
const showDetails = reactive({});

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
    icon: "fa-solid fa-gears",
    title: "Engine Tuning",
    description:
      "Optimize your car's performance with our expert engine tuning services.",
  },
];

const showLoginSignUpForm = () =>
  store.dispatch("loginAndSignUp/showLoginSignUpForm");

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.angled-divider {
  height: 60px;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
  top: -59px;
}
.angled-divider-2 {
  height: 60px;
  clip-path: polygon(0 0, 100% 0, 0 100%);
  top: -1px;
}
.text-overlay {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 8px;
}
.background {
  background: linear-gradient(132deg, #263238, #000000, #424242);
  background-size: 400% 400%;
  animation: Gradient 10s ease infinite;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0px;
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
</style>
