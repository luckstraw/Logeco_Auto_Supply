<template>
  <v-container fluid class="d-flex" style="height: 90vh">
    <v-row class="flex-grow-1">
      <v-col cols="2" class="d-flex flex-column" style="gap: 12px">
        <v-card
          class="rounded-xl d-flex flex-column justify-center align-center"
          style="height: 30vh"
        >
          <h2>Logeco Admin</h2>
          <v-avatar
            size="130"
            image="https://i.imgur.com/Uibhtmc.png"
            :style="{ border: `2px solid ${color.secondary}` }"
          >
          </v-avatar>

          <v-btn
            class="rounded-pill mt-2"
            :color="color.secondary"
            density="compact"
            @click="handleLogout"
            >Logout</v-btn
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
