<template>
  <v-app-bar app :style="appBarStyle" class="px-5">
    <!-- Mobile Navigation (Bar Icon + Dropdown) -->
    <div class="d-flex d-md-none">
      <v-menu close-on-content-click offset-y>
        <template #activator="{ props }">
          <v-app-bar-nav-icon v-bind="props" />
        </template>
        <v-list>
          <v-list-item
            v-for="link in navLinks"
            :key="link.to"
            @click="$router.push(link.to)"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- Logo -->
    <router-link to="/" class="v-toolbar-title">
      <v-img
        :width="275"
        aspect-ratio="16/9"
        cover
        src="@/assets/LogecoLogo.png"
      />
    </router-link>

    <v-spacer />

    <!-- Desktop Navigation Links -->
    <nav class="d-none d-md-flex">
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

    <!-- Login Button -->
    <v-btn
      v-if="!user"
      class="rounded-pill d-none d-md-flex"
      :color="color.secondary"
      variant="flat"
      @click="showLoginSignUpForm"
    >
      Login
    </v-btn>

    <!-- Admin/User Links -->
    <router-link
      v-if="user && user.role === 'admin'"
      to="/users"
      class="text-button d-none d-md-flex"
      :class="{ 'active-link': $route.path === '/users' }"
    >
      User's View
    </router-link>

    <router-link
      v-if="user"
      :to="user.role === 'admin' ? '/admin' : '/users'"
      class="text-button d-none d-md-flex"
      :class="{
        'active-link':
          $route.path === (user.role === 'admin' ? '/admin' : '/users'),
      }"
    >
      Dashboard
    </router-link>

    <LoginSignUpForm />
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import LoginSignUpForm from "./LoginSignUpForm.vue";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);
const user = computed(() => store.getters["authentication/getUser"]);

const showLoginSignUpForm = () =>
  store.dispatch("loginAndSignUp/showLoginSignUpForm");

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
