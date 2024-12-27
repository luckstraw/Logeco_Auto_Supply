<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer v-if="!hideFooter" />
    <InfoDialog />
  </v-app>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavigationBar.vue";
import Footer from "@/components/FooterComponent.vue";
import InfoDialog from "@/components/InfoDialog.vue";

const route = useRoute();
const hideFooter = computed(
  () => route.path.startsWith("/admin") || route.path.startsWith("/users")
);
</script>
