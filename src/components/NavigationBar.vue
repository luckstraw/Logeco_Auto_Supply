<template>
  <!-- eslint-disable -->
  <v-app-bar app :style="appBarStyle" class="px-5">
    <!-- Mobile Navigation -->
    <div class="d-flex d-md-none">
      <v-speed-dial
        location="right center"
        transition="scale-transition"
        v-model="isSpeedDialActive"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-app-bar-nav-icon v-bind="activatorProps" />
        </template>

        <v-btn
          variant="flat"
          v-for="link in navLinks"
          :key="link.to"
          :icon="link.icon"
          @click="$router.push(link.to)"
        >
          <v-icon>{{ link.icon }}</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>

    <!-- Logo -->
    <router-link to="/" class="v-toolbar-title">
      <v-img
        v-if="!isSpeedDialActive"
        :width="275"
        aspect-ratio="16 / 9"
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
      class="rounded-pill"
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

    <!-- Dashboard Button with Conditional Rendering -->
    <div class="dashboard-link">
      <!-- Show text button on desktop -->
      <router-link
        v-if="$vuetify.display.mdAndUp"
        :to="user?.role === 'admin' ? '/admin' : '/users'"
        class="text-button"
        :class="{
          'active-link':
            $route.path === (user?.role === 'admin' ? '/admin' : '/users'),
        }"
      >
        Dashboard
      </router-link>

      <!-- Show icon-only button on mobile -->
      <v-btn
        v-else
        icon
        :to="user?.role === 'admin' ? '/admin' : '/users'"
        :color="$route.path === (user?.role === 'admin' ? '/admin' : '/users') ? color.secondary : undefined"
      >
        <v-icon>fa-solid fa-user</v-icon>
      </v-btn>
    </div>

    <LoginSignUpForm />
  </v-app-bar>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import LoginSignUpForm from "./LoginSignUpForm.vue";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);
const user = computed(() => store.getters["authentication/getUser"]);

// Reactive state to track the speed dial's active state
const isSpeedDialActive = ref(false);

const showLoginSignUpForm = () =>
  store.dispatch("loginAndSignUp/showLoginSignUpForm");

const navLinks = [
  { to: "/", text: "Home", icon: "fa-solid fa-home" },
  { to: "/products", text: "Products", icon: "fa-solid fa-store" },
  { to: "/services", text: "Services", icon: "fa-solid fa-wrench" },
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

.dashboard-link {
  display: flex;
  align-items: center;
}
</style>
