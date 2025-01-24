<template>
  <!-- eslint-disable -->
  <v-container fluid class="pa-2 ma-0">
    <v-row class="ma-0 justify-center" style="height: 90vh">
      <!-- Profile and Chat -->
      <v-col cols="12" md="3" class="d-flex flex-column" style="gap: 24px">
        <UserProfile />
        <!-- Show User Chat only on desktop -->
        <div class="d-none d-md-flex">
          <UserChat />
        </div>
      </v-col>

      <!-- Schedule -->
      <v-col cols="12" md="9" class="d-flex">
        <UserSchedule />
      </v-col>
    </v-row>

    <!-- Mobile Menu for User Chat -->
    <v-responsive class="d-md-none">
      <div class="message-button">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="fa-solid fa-message"></v-btn>
          </template>

          <v-card min-width="400" min-height="400">
            <v-card-item>
              <UserChat />
            </v-card-item>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="text" @click="menu = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
import UserChat from "@/components/user/UserChat.vue";
import UserSchedule from "@/components/user/UserSchedule.vue";
import UserProfile from "@/components/user/UserProfile.vue";

import { ref } from "vue";
const menu = ref(false);
</script>

<style scoped>
.message-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
