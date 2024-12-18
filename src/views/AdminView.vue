<template>
  <h1>AdminView</h1>
  <h2 v-if="userinfo">{{ userinfo.email }}</h2>
  <div>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const userinfo = computed(() => store.getters["authentication/getUser"]);

const handleLogout = async () => {
  try {
    await store.dispatch("authentication/signOut");
    router.push("/");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
</script>

<style></style>
