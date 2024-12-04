<template>
  <v-app-bar app :style="appBarStyle" class="px-5">
    <router-link to="/" class="v-toolbar-title">
      <v-img
        :width="275"
        aspect-ratio="16/9"
        cover
        src="@/assets/LogecoLogo.png"
      />
    </router-link>

    <v-spacer />

    <nav>
      <router-link
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="text-button"
        :class="{ 'active-link': $route.path === link.to }"
      >
        {{ link.text }}
      </router-link>
    </nav>

    <v-btn
      class="rounded-pill"
      :color="color.secondary"
      variant="flat"
      @click="showLoginForm"
    >
      Login
    </v-btn>
    <LoginForm />
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import LoginForm from "@/components/LoginForm";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]); // use for color.secondary
const showLoginForm = () => store.dispatch("login/showLoginForm");

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/services", text: "Services" },
];

const appBarStyle = computed(() => ({
  borderBottom: `4px solid ${color.value.secondary}`,
}));
</script>

<style scoped>
.text-button {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  margin: 0 15px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.text-button:hover,
.text-button:focus,
.active-link {
  color: v-bind("color.secondary");
}
</style>
