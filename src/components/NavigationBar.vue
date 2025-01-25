<template>
  <v-app-bar
    :style="{ borderBottom: `4px solid ${color.secondary}`, width: '100vw' }"
  >
    <template v-slot:prepend>
      <!--Mobile Nav-->
      <div class="d-flex d-sm-none">
        <v-speed-dial
          location="right center"
          :close-on-content-click="false"
          v-model="isSpeedDialActive"
        >
          <template #activator="{ props }">
            <v-app-bar-nav-icon v-bind="props" />
          </template>

          <v-icon
            v-for="link in mobileNavLinks"
            :key="link.id"
            :icon="link.icon"
            :color="$route.path === link.to ? color.secondary : ''"
            class="mx-3"
            size="small"
            @click="$router.push(link.to)"
          />
        </v-speed-dial>
      </div>

      <!--Logo-->
      <router-link v-show="!isSpeedDialActive" to="/">
        <template v-if="xs">
          <div class="d-flex mt-2">
            <div style="margin-top: 1px" v-html="mobileLogoTemplate1"></div>
            <div class="ml-n1" v-html="mobileLogoTemplate2"></div>
          </div>
        </template>
        <template v-else>
          <div class="d-flex">
            <div class="mt-3" v-html="desktopLogoTemplate1"></div>
            <div
              class="ml-n3"
              style="margin-top: 1px"
              v-html="desktopLogoTemplate2"
            ></div>
          </div>
        </template>
      </router-link>
    </template>

    <template v-slot:append>
      <router-link
        v-for="link in desktopNavLinks"
        :key="link.to"
        :to="link.to"
        class="text-button d-none d-sm-flex"
        :class="{ 'active-link': $route.path === link.to }"
      >
        {{ link.text }}
      </router-link>

      <router-link
        v-if="user && user.role === 'admin'"
        to="/users"
        class="text-button"
        :class="{ 'active-link': $route.path === '/users' }"
      >
        <template v-if="xs">
          <v-icon>fa-solid fa-user-group</v-icon>
        </template>
        <template v-else> User's View </template>
      </router-link>

      <router-link
        v-if="user"
        :to="user.role === 'admin' ? '/admin' : '/users'"
        class="text-button"
        :class="{
          'active-link':
            $route.path === (user.role === 'admin' ? '/admin' : '/users'),
        }"
      >
        <template v-if="xs">
          <v-icon>fa-solid fa-user</v-icon>
        </template>
        <template v-else> Dashboard </template>
      </router-link>

      <v-btn
        v-if="!user"
        class="rounded-pill mx-3"
        :color="color.secondary"
        :size="$vuetify.display.smAndDown ? 'small' : 'default'"
        variant="flat"
        @click="showLoginSignUpForm"
      >
        Login
      </v-btn>
    </template>

    <LoginSignUpForm />
  </v-app-bar>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useDisplay } from "vuetify";
import { logeco, autosupply } from "@/assets/logecoLogo.js";
import LoginSignUpForm from "./LoginSignUpForm.vue";

const { xs } = useDisplay();
const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);
const user = computed(() => store.getters["authentication/getUser"]);

const isSpeedDialActive = ref(false);

const mobileLogoTemplate1 = ref(logeco("#fff", "68", "17"));
const mobileLogoTemplate2 = ref(autosupply(color.value.secondary, "110", "15"));
const desktopLogoTemplate1 = ref(logeco("#fff", "150", "30"));
const desktopLogoTemplate2 = ref(
  autosupply(color.value.secondary, "200", "50")
);

const mobileNavLinks = [
  { id: 1, to: "/", icon: "fa-solid fa-home" },
  { id: 2, to: "/products", icon: "fa-solid fa-store" },
  { id: 3, to: "/services", icon: "fa-solid fa-wrench" },
];

const desktopNavLinks = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/services", text: "Service" },
];

const showLoginSignUpForm = () =>
  store.dispatch("loginAndSignUp/showLoginSignUpForm");
</script>

<style scoped>
.text-button {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  margin: 0 16px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.text-button:hover,
.text-button:focus,
.active-link {
  color: v-bind("color.secondary");
}
</style>
