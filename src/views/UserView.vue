<template>
  <v-container fluid class="pa-2 ma-0">
    <v-row class="ma-0 justify-center" style="height: 90vh">
      <!-- Schedule -->
      <v-col cols="12" md="9" class="d-flex order-2 order-md-1">
        <UserSchedule />
      </v-col>

      <!-- Profile and Chat -->
      <v-col
        cols="12"
        md="3"
        class="d-flex flex-column order-1 order-md-2"
        style="gap: 24px"
      >
        <UserProfile />
        <div v-if="!$vuetify.display.xs">
          <UserChat />
        </div>
      </v-col>
    </v-row>

    <div class="d-flex d-sm-none">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="top start"
        origin="bottom end"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            class="message-button"
            :color="color.secondary"
            v-bind="props"
            icon
          >
            <v-icon>fa-solid fa-message</v-icon>
          </v-btn>
        </template>
        <UserChat />
      </v-menu>
    </div>
  </v-container>
</template>

<script setup>
import UserChat from "@/components/user/UserChat.vue";
import UserSchedule from "@/components/user/UserSchedule.vue";
import UserProfile from "@/components/user/UserProfile.vue";

import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const menu = ref(false);
</script>

<style scoped>
.message-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}
</style>
