<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
    <InfoDialog />
  </v-app>
</template>

<script setup>
import NavBar from "@/components/NavigationBar.vue";
import Footer from "@/components/FooterComponent.vue";
import InfoDialog from "@/components/InfoDialog.vue";
</script>
