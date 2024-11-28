<template>
  <h1>UserView</h1>
  <h2 v-if="userinfo" :style="{ color: color.info }">
    {{ userinfo.email }} + {{ userinfo.role }} + ahhasdafsaf
  </h2>
  <div>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const userinfo = computed(() => store.getters["authentication/getUser"]);
const color = computed(() => store.getters["colors/getColor"]);

watchEffect(() => {
  console.log("userinfo:", userinfo.value);
  if (userinfo.value) {
    console.log("Role:", userinfo.value.role);
  }
});

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
