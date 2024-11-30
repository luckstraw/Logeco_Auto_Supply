<template>
  <v-footer>
    <v-container>
      <!-- Footer Content -->
      <v-row justify="center" class="mb-8 mt-8">
        <!-- Contact Us -->
        <v-col cols="12" md="3" class="mb-4">
          <h3 :style="{ color: color.secondary }">Contact Us</h3>
          <p>
            <v-icon>fa-solid fa-phone fa-sm</v-icon>
            {{ contactInfo.phone }}
          </p>
          <p>
            <v-icon>fa-solid fa-envelope fa-sm</v-icon>
            {{ contactInfo.email }}
          </p>
        </v-col>

        <!-- Follow Us -->
        <v-col cols="12" md="2" class="mb-4">
          <h3 :style="{ color: color.secondary }">Follow Us</h3>
          <a
            v-for="social in socialMedia"
            :key="social.name"
            :href="social.url"
            target="_blank"
            :style="{ color: color.primary, textDecoration: 'none' }"
          >
            <v-icon left>{{ social.icon }}</v-icon>
            {{ social.name }}
          </a>
        </v-col>

        <!-- Location -->
        <v-col cols="12" md="3" class="mb-4">
          <h3 :style="{ color: color.secondary }">Our Location</h3>
          <p>{{ location.address }}</p>
          <p>{{ location.city }}</p>
        </v-col>

        <!-- Operating Hours -->
        <v-col cols="12" md="3" class="mb-4">
          <h3 :style="{ color: color.secondary }">Operating Hours</h3>
          <p v-for="(hours, index) in operatingHours" :key="index">
            {{ hours }}
          </p>
        </v-col>
      </v-row>

      <!-- Disclaimer -->
      <v-row justify="center" class="text-center mb-4">
        <h4 :style="{ color: color.warning }">
          <strong>Disclaimer:</strong> {{ disclaimer }}
        </h4>
      </v-row>

      <!-- Copyright -->
      <v-row justify="center" class="text-center">
        <h4>
          <strong
            >&copy; {{ new Date().getFullYear() }} Logeco Auto Supply. All
            Rights Reserved.</strong
          >
        </h4>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);
const contactInfo = computed(() => store.getters["footer/getContactInfo"]);
const socialMedia = computed(() => store.getters["footer/getSocialMedia"]);
const location = computed(() => store.getters["footer/getLocation"]);
const operatingHours = computed(
  () => store.getters["footer/getOperatingHours"]
);
const disclaimer = computed(() => store.getters["footer/getDisclaimer"]);
</script>

<style scoped></style>
