<template>
  <v-parallax height="90vh" :src="homeSettings.mainPhoto">
    <div
      data-aos="fade-down-left"
      data-aos-duration="2000"
      class="position-absolute"
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
      class="position-absolute"
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
      class="position-absolute w-100 fill-height d-flex align-center pa-5"
      :style="{
        backgroundColor: 'rgba(33, 33, 33, 0.6)',
        clipPath: 'polygon(0 0, 75% 0, 50% 100%, 0 100%)',
        zIndex: -1,
      }"
    >
      <div>
        <div
          class="text-h5 font-weight-black"
          :style="{ color: `${color.secondary}` }"
        >
          LOGECO AUTO SUPPLY
        </div>
        <v-divider
          class="border-opacity-100"
          :thickness="4"
          :color="color.secondary"
          style="margin-right: 50%"
        />
        <div class="text-h4 my-2 font-weight-black" style="margin-right: 50%">
          Your Trusted Source for Mitsubishi Genuine Parts And Reliable
          Replacements
        </div>
      </div>
    </div>
  </v-parallax>

  <div style="height: 60vh" class="d-flex justify-center align-center">
    <div
      data-aos="fade-down-left"
      data-aos-easing="linear"
      data-aos-offset="100"
      class="w-100 pa-5 position-absolute"
      :style="{
        height: '60vh',
        backgroundColor: `${color.secondary}`,
        clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 33% 100%)',
      }"
    ></div>

    <div
      data-aos="fade-down-left"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
      data-aos-duration="750"
      class="d-flex align-center justify-center position-absolute"
      :style="{
        left: '5%',
        height: '40vh',
        width: '50%',
        clipPath: 'polygon(100% 0, 77.3% 100%, 0 100%, 0 0)',
      }"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-img
          v-bind="props"
          src="https://i.imgur.com/1kQMFld.jpeg"
          gradient="to top right, rgba(0,0,0,.9), rgba(250,250,250,.1)"
          cover
        >
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="transition-fast-in-fast-out top-0 card-reveal"
              :style="{ backgroundColor: `${color.secondary}` }"
            >
              <div>Left Picture</div>
            </div>
          </v-expand-transition>
        </v-img>
      </v-hover>
    </div>

    <div
      data-aos="fade-up-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
      data-aos-duration="750"
      class="d-flex align-center justify-center position-absolute rounded-te-xl rounded-be-xl"
      :style="{
        left: '45%',
        height: '40vh',
        width: '50%',
        clipPath: 'polygon(0% 100%, 22.7% 0, 100% 0, 100% 100%)',
      }"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-img
          v-bind="props"
          src="https://i.imgur.com/uT3hatz.jpeg"
          gradient="to top right, rgba(0,0,0,.9), rgba(250,250,250,.1)"
          cover
        >
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="transition-fast-in-fast-out bottom-0 card-reveal"
              :style="{ backgroundColor: `${color.primary}` }"
            >
              <div>Right Picture</div>
            </div>
          </v-expand-transition>
        </v-img>
      </v-hover>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const homeSettings = computed(() => store.getters["adminSettings/getHome"]);
</script>

<style scoped>
.card-reveal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 0.7;
}
</style>
