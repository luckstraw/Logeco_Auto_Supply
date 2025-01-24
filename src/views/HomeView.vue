<template>
  <!--First Section-->
  <v-parallax :height="parallaxHeight" :src="homeSettings.mainPhoto">
    <!--Parallelogram-->
    <div
      data-aos="fade-down-left"
      data-aos-duration="2000"
      class="position-absolute d-none d-sm-flex"
      :style="{
        height: '50%',
        width: '20%',
        backgroundColor: '#fff',
        left: '57%',
        clipPath: 'polygon(60% 0%, 100% 0, 40% 100%, 0 100%)',
      }"
    ></div>
    <div
      data-aos="fade-down-left"
      data-aos-duration="3000"
      class="position-absolute d-none d-sm-flex"
      :style="{
        height: '30%',
        width: '15%',
        backgroundColor: `${color.secondary}`,
        left: '65%',
        clipPath: 'polygon(50% 0%, 100% 0, 50% 100%, 0 100%)',
      }"
    ></div>
    <div
      data-aos="fade-up-right"
      data-aos-duration="1000"
      class="position-absolute w-100 fill-height d-none d-sm-flex"
      :style="{
        backgroundColor: `${color.primary}`,
        clipPath: 'polygon(0 0, 75% 0, 50% 100%, 0 100%)',
        opacity: '0.75',
        zIndex: -1,
      }"
    ></div>

    <!--Parallelogram For Mobile-->
    <div
      data-aos="fade-down-left"
      data-aos-duration="2000"
      class="position-absolute d-flex d-sm-none"
      :style="{
        height: '20%',
        width: '30%',
        backgroundColor: '#fff',
        left: '50%',
        clipPath: 'polygon(34.5% 0, 100% 0, 85.5% 100%, 20% 100%)',
      }"
    ></div>
    <div
      data-aos="fade-down-left"
      data-aos-duration="3000"
      class="position-absolute d-flex d-sm-none"
      :style="{
        height: '15%',
        width: '30%',
        backgroundColor: `${color.secondary}`,
        left: '58%',
        clipPath: 'polygon(31.5% 0, 100% 0, 88.5% 100%, 20% 100%)',
      }"
    ></div>
    <div
      data-aos="fade-up-right"
      data-aos-duration="1000"
      class="position-absolute w-100 fill-height d-flex d-sm-none"
      :style="{
        backgroundColor: `${color.primary}`,
        clipPath: 'polygon(0 0, 72% 0, 50% 100%, 0 100%)',
        opacity: '0.6',
        zIndex: -1,
      }"
    ></div>

    <!--Main Title and Subtitle-->
    <div class="fill-height d-flex justify-center align-center">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <div
              data-aos="fade-down"
              data-aos-duration="1000"
              class="text-lg-h1 text-md-h2 text-sm-h3 text-h3 text-md-left text-sm-left text-center font-weight-black"
            >
              LOGECO
            </div>
            <v-divider
              data-aos="fade-right"
              data-aos-duration="3000"
              :thickness="5"
              :color="color.secondary"
              class="border-opacity-100 mb-2"
            />
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              class="text-lg-h5 text-h7 font-weight-bold text-md-left text-sm-left text-center black-outline"
              :style="{ color: `${color.secondary}` }"
            >
              Your Trusted Source for Mitsubishi Genuine Parts And Reliable
              Replacements
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!--Triangles-->
    <div
      data-aos="zoom-in-right"
      data-aos-duration="2000"
      data-aos-offset="-100"
      class="w-50 position-absolute bottom-0"
      :style="{
        height: '10%',
        backgroundColor: `${color.secondary}`,
        clipPath: 'polygon(0 0, 0% 100%, 100% 100%)',
      }"
    ></div>
    <div
      data-aos="zoom-in-left"
      data-aos-duration="2000"
      data-aos-offset="-100"
      class="w-50 position-absolute bottom-0 right-0"
      :style="{
        height: '10%',
        backgroundColor: `${color.primary}`,
        clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
      }"
    ></div>
  </v-parallax>

  <!--Second Section-->
  <div style="height: 60vh" class="d-flex justify-center align-center">
    <!--Red Parallelogram-->
    <div
      data-aos="fade-down-left"
      data-aos-easing="linear"
      data-aos-offset="100"
      class="w-100 position-absolute"
      :style="{
        height: '60vh',
        backgroundColor: `${color.secondary}`,
        clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 33% 100%)',
      }"
    ></div>

    <!--Products-->
    <div
      data-aos="fade-down-left"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
      data-aos-duration="750"
      class="d-flex align-center justify-center position-absolute"
      :style="{
        border: `2px solid ${color.secondary}`,
        left: '5%',
        height: '45vh',
        width: '50%',
        clipPath: 'polygon(100% 0, 77.3% 100%, 0 100%, 0 0)',
      }"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-img
          v-bind="props"
          :src="tempLink1"
          height="100%"
          gradient="to top right, rgba(0,0,0,.9), rgba(250,250,250,.1)"
          cover
        >
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="transition-fast-in-fast-out top-0 card-reveal"
              :style="{ backgroundColor: `${color.secondary}` }"
            >
              <div
                class="d-flex flex-column align-start justify-center w-75 h-75"
              >
                <div
                  class="text-md-h3 text-h5 font-weight-black"
                  :style="{ color: `${color.primary}` }"
                >
                  Genuine Parts
                </div>
                <div class="text-md-h5 text-subtitle-2 font-weight-light my-2">
                  Experience peak performance with perfectly fitting parts.
                </div>
                <v-btn
                  class="rounded-xl"
                  :color="color.primary"
                  :size="$vuetify.display.smAndDown ? 'small' : 'default'"
                  to="/products"
                >
                  Shop Now
                </v-btn>
              </div>
            </div>
          </v-expand-transition>
        </v-img>
      </v-hover>
    </div>

    <!--Service-->
    <div
      data-aos="fade-up-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
      data-aos-duration="750"
      class="d-flex align-center justify-center position-absolute"
      :style="{
        left: '45%',
        height: '45vh',
        width: '50%',
        clipPath: 'polygon(0% 100%, 22.7% 0, 100% 0, 100% 100%)',
      }"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-img
          v-bind="props"
          :src="tempLink2"
          height="100%"
          gradient="to top right, rgba(0,0,0,.9), rgba(250,250,250,.1)"
          cover
        >
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="transition-fast-in-fast-out bottom-0 card-reveal"
              :style="{ backgroundColor: `${color.primary}` }"
            >
              <div
                class="d-flex flex-column align-end justify-center w-75 h-75"
              >
                <div
                  class="text-md-h3 text-h5 font-weight-black text-right"
                  :style="{ color: `${color.secondary}` }"
                >
                  Expert Services
                </div>
                <div
                  class="text-md-h5 text-subtitle-2 font-weight-light my-2 text-right"
                >
                  Get expert help and find the perfect parts effortlessly.
                </div>
                <v-btn
                  class="rounded-xl"
                  :color="color.secondary"
                  :size="$vuetify.display.smAndDown ? 'small' : 'default'"
                  to="/services"
                >
                  Get Started
                </v-btn>
              </div>
            </div>
          </v-expand-transition>
        </v-img>
      </v-hover>
    </div>
  </div>

  <!--Third Section-->
  <div style="height: 70vh" class="d-flex align-center">
    <!--Red Parallelogram-->
    <div
      data-aos="fade-up-right"
      data-aos-easing="linear"
      data-aos-offset="100"
      class="w-100 position-absolute"
      :style="{
        height: '70vh',
        backgroundColor: `${color.secondary}`,
        clipPath: 'polygon(0 0, 33% 0, 13.2% 100% ,0 100%)',
      }"
    ></div>

    <!--MAP-->
    <v-container class="pa-0">
      <v-row class="ma-0" align="center">
        <v-col md="4" cols="12" style="z-index: 1">
          <div
            data-aos="fade-right"
            data-aos-duration="750"
            class="text-h4 text-lg-h1 text-md-h2 font-weight-black font-italic"
          >
            OUR LOCATION
          </div>
        </v-col>
        <v-col offset-md="2" md="6" cols="12" style="z-index: 1">
          <div
            style="height: 50vh"
            data-aos="zoom-in-left"
            data-aos-duration="750"
            data-aos-offset="200"
          >
            <iframe
              :src="mapLink"
              class="rounded-xl fill-height w-100"
              :style="{ border: `3px solid ${color.secondary}` }"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useStore } from "vuex";

const { xs } = useDisplay();
const parallaxHeight = computed(() => (xs.value ? "80vh" : "90vh"));

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const homeSettings = computed(() => store.getters["adminSettings/getHome"]);
const tempLink1 = ref("https://i.imgur.com/1kQMFld.jpeg");
const tempLink2 = ref("https://i.imgur.com/uT3hatz.jpeg");
const mapLink = ref(
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d241.63554051490178!2d121.01101066109747!3d14.30163187433078!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d642046c4d27%3A0xbbbc14706ebb44d7!2sLogeco%20Auto%20Supply!5e0!3m2!1sen!2sph!4v1731774980364!5m2!1sen!2sph"
);

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.black-outline {
  text-shadow: 0.5px 0.5px 0 black, -0.5px -0.5px 0 black, -0.5px 0.5px 0 black,
    0.5px -0.5px 0 black;
}
.card-reveal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 0.8;
}
</style>
