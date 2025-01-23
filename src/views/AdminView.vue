<template>
  <!-- eslint-disable -->
  <v-container fluid class="d-flex" style="height: 90vh">
    <v-row class="flex-grow-1">
      <v-col cols="2" class="d-flex flex-column" style="gap: 12px">
        <v-card
    class="rounded-xl d-flex flex-column justify-center align-center"
    style="height: 30vh"
  >
    <div
      style="
        position: absolute;
        top: 0;
        width: 100%;
        height: 50%;
        background-color: #b71c1c;
      "
    ></div>
    <v-avatar
      class="mt-4 mb-1"
      size="15vh"
      image="https://cdn.vuetifyjs.com/images/john.jpg"
      :style="{ border: `5px solid ${color.secondary}` }"
    >
    </v-avatar>
    <h4>Logeco Admin</h4>
    <v-btn
      size="x-small"
      icon="fa-solid fa-arrow-right-from-bracket"
      class="rounded-pill mt-1"
      :color="color.secondary"
      @click="handleLogout"
      ></v-btn
    >
  </v-card>
        <v-card class="pa-4 d-flex flex-column rounded-xl" variant="tonal">
          <v-btn
            v-for="item in navItems"
            :key="item.key"
            block
            :color="item.key === selectedComponentKey ? color.secondary : ''"
            class="rounded-pill py-6 my-2"
            @click="selectComponent(item.key)"
          >
            <v-icon class="mr-4">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="10">
        <component :is="selectedComponent"></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import AdminChat from "@/components/admin/AdminChat.vue";
import AdminProducts from "@/components/admin/AdminProducts.vue";
import AdminServices from "@/components/admin/AdminServices.vue";
import AdminSchedule from "@/components/admin/AdminSchedule.vue";
import AdminSettings from "@/components/admin/AdminSettings.vue";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const components = {
  AdminChat,
  AdminProducts,
  AdminServices,
  AdminSchedule,
  AdminSettings,
};

const selectedComponentKey = computed(
  () => store.getters["admin/selectedComponentKey"]
);
const selectedComponent = computed(
  () => components[selectedComponentKey.value]
);

const navItems = [
  { title: "Messages", icon: "fa-solid fa-message", key: "AdminChat" },
  {
    title: "Products",
    icon: "fa-solid fa-boxes-stacked",
    key: "AdminProducts",
  },
  { title: "Services", icon: "fa-solid fa-users-gear", key: "AdminServices" },
  {
    title: "Schedule",
    icon: "fa-solid fa-calendar-days",
    key: "AdminSchedule",
  },
  { title: "Settings", icon: "fa-solid fa-wrench", key: "AdminSettings" },
];

const selectComponent = (key) => {
  store.dispatch("admin/selectComponent", key);
};

const handleLogout = () => {
  store.dispatch("authentication/signOut");
};
</script>

<style scoped></style>
