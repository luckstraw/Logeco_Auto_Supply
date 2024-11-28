<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import NavBar from "@/components/NavigationBar.vue";
import Footer from "@/components/FooterComponent.vue";
</script>
