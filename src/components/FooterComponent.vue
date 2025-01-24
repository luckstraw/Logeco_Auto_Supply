<template>
  <v-footer>
    <v-container class="pa-0 mt-10">
      <v-row class="ma-0" justify="center">
        <v-col cols="12" md="3">
          <div
            data-aos="fade-right"
            class="text-h5 font-weight-bold"
            :style="{ color: color.secondary }"
          >
            Operating Hours
          </div>
          <div data-aos="fade-left" class="text-subtitle-2">
            Mon - Fri: 8:00 AM - 6:00 PM
          </div>
          <div data-aos="fade-left" class="text-subtitle-2">
            Sat: 9:00 AM - 5:00 PM
          </div>
          <div data-aos="fade-left" class="text-subtitle-2">
            Closed on Sundays
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <div
            data-aos="fade-right"
            class="text-h5 font-weight-bold"
            :style="{ color: color.secondary }"
          >
            Follow Us
          </div>

          <div
            data-aos="fade-left"
            class="text-subtitle-2 d-flex align-center"
            style="cursor: pointer"
            @click="openFacebook"
          >
            <v-icon start>fa-brands fa-facebook-f </v-icon>
            Facebook
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <div
            data-aos="fade-right"
            class="text-h5 font-weight-bold"
            :style="{ color: color.secondary }"
          >
            Our Location
          </div>
          <div data-aos="fade-left" class="text-subtitle-2">
            Blk 2 Lot 10, Poblacion 4
          </div>
          <div data-aos="fade-left" class="text-subtitle-2">
            GMA, Cavite 4117
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <h3
            data-aos="fade-right"
            class="text-h5 font-weight-bold"
            :style="{ color: color.secondary }"
          >
            Contact Us
          </h3>
          <div data-aos="fade-left" class="text-subtitle-2">
            <v-icon start>fa-solid fa-phone fa-sm</v-icon>
            {{ footerInfo.phone }}
          </div>
          <div data-aos="fade-left" class="text-subtitle-2">
            <v-icon start>fa-regular fa-envelope fa-sm</v-icon>
            {{ footerInfo.email }}
          </div>
        </v-col>

        <v-col cols="12" md="12" class="d-flex justify-center pb-0 mt-8">
          <div
            class="text-center text-subtitle-1"
            :style="{ color: color.warning }"
          >
            <strong>Disclaimer:</strong>
            For in-store purchases only. No online transactions available.
          </div>
        </v-col>
        <v-col cols="12" md="12" class="d-flex justify-center">
          <div class="text-center text-subtitle-2">
            <strong
              >&copy; {{ new Date().getFullYear() }} Logeco Auto Supply. All
              Rights Reserved.</strong
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);
const footerInfo = computed(() => store.getters["adminSettings/getFooter"]);

const openFacebook = () => {
  if (footerInfo.value?.facebook) {
    window.open(footerInfo.value.facebook, "_blank");
  }
};
</script>

<style scoped></style>
