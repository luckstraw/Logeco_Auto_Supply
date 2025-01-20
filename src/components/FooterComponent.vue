<template>
  <v-footer>
    <v-container class="pa-0 mt-10">
      <v-row class="ma-0" justify="center">
        <v-col cols="12" md="3">
          <h3 :style="{ color: color.secondary }">Operating Hours</h3>
          <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
          <div>Sat: 9:00 AM - 5:00 PM</div>
          <div>Closed on Sundays</div>
        </v-col>
        <v-col cols="12" md="2">
          <h3 :style="{ color: color.secondary }">Follow Us</h3>
          <a
            :href="footerInfo.facebook"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <v-icon start>fa-brands fa-facebook-f fa-sm</v-icon>
            Facebook
          </a>
        </v-col>
        <v-col cols="12" md="2">
          <h3 :style="{ color: color.secondary }">Our Location</h3>
          <div>Blk 2 Lot 10, Poblacion 4</div>
          <div>GMA, Cavite 4117</div>
        </v-col>
        <v-col cols="12" md="3">
          <h3 :style="{ color: color.secondary }">Contact Us</h3>
          <div>
            <v-icon start>fa-solid fa-phone fa-sm</v-icon>
            {{ footerInfo.phone }}
          </div>
          <div>
            <v-icon start>fa-regular fa-envelope fa-sm</v-icon>
            {{ footerInfo.email }}
          </div>
        </v-col>
        <v-col cols="12" md="12" class="d-flex justify-center pb-0 mt-10">
          <h4 :style="{ color: color.warning }">
            <strong>Disclaimer:</strong>
            For in-store purchases only. No online transactions available.
          </h4>
        </v-col>
        <v-col cols="12" md="12" class="d-flex justify-center">
          <h4>
            <strong
              >&copy; {{ new Date().getFullYear() }} Logeco Auto Supply. All
              Rights Reserved.</strong
            >
          </h4>
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
</script>

<style scoped>
.debug {
  border: 1px solid cyan;
}
.social-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.social-link:hover {
  opacity: 0.8;
}
</style>
