<template>
  <!-- eslint-disable -->
  <v-container fluid class="pa-2 ma-0 d-bug">
    <v-row class="ma-0 justify-center" style="height: 85vh">
      <!-- user profil -->
      <v-col cols="12" md="3" class="d-flex flex-column order-sm-1 order-md-2 d-bug" style="gap: 24px">
        <UserProfile />
        <!-- Show User Chat only on desktop -->
        <div class="d-none d-md-flex">
          <UserChat />
        </div>
      </v-col>
      <!-- Schedule -->
      <v-col cols="12" md="9" class="d-flex order-sm-2 order-md-1 d-bug">
        <UserSchedule />
      </v-col>  
    </v-row>

    <!-- Mobile Menu for User Chat -->
    <v-responsive class="d-md-none">
      <div class="message-button">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-btn :color="color.secondary" v-bind="props" icon>
              <v-icon>fa-solid fa-message</v-icon>
              </v-btn>
          </template>

          <div>
            <v-card-item>
              <UserChat />
            </v-card-item>

            <v-divider></v-divider>

            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="text" @click="menu = false">Close</v-btn>
            </v-card-actions> -->
          </div>
        </v-menu>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
/* eslint-disable */
import { useStore } from "vuex";
import { computed } from "vue";
import UserChat from "@/components/user/UserChat.vue";
import UserSchedule from "@/components/user/UserSchedule.vue";
import UserProfile from "@/components/user/UserProfile.vue";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

import { ref } from "vue";
const menu = ref(false);
</script>

<style scoped>
/* eslint-disable */
.d-bug{
  border: 2px solid cyan; 
}

.message-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
