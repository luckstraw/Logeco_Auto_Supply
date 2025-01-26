<template>
  <v-container class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col cols="12" md="2">
        <v-card
          class="rounded-xl mb-5 d-flex flex-column justify-center align-center"
          :color="color.accent"
          :style="{ border: `2px solid ${color.secondary}`, height: '30vh' }"
        >
          <v-avatar
            size="80"
            image="https://i.imgur.com/Uibhtmc.png"
            :style="{ border: `2px solid ${color.secondary}` }"
          />
          <div class="text-md-h6 my-2">Logeco Admin</div>

          <v-btn
            size="small"
            class="rounded-pill"
            :color="color.secondary"
            @click="handleLogout"
            >Log out</v-btn
          >
        </v-card>
        <v-card class="rounded-xl pa-4" variant="tonal">
          <v-btn
            v-for="item in navItems"
            :key="item.key"
            block
            :prepend-icon="item.icon"
            :color="item.key === selectedComponentKey ? color.secondary : ''"
            class="rounded-xl my-2 py-6"
            variant="flat"
            @click="selectComponent(item.key)"
          >
            {{ item.title }}
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="10">
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
