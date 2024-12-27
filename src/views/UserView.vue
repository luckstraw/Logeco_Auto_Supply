<template>
  <v-container fluid class="pa-2 ma-0">
    <v-row class="ma-0 justify-center" style="height: 90vh">
      <v-col cols="7" class="d-flex">
        <v-card
          class="d-flex flex-grow-1 justify-center align-center rounded-xl"
        >
          schedule
        </v-card>
      </v-col>
      <v-col cols="3" class="d-flex flex-column" style="gap: 24px">
        <v-card class="rounded-xl pa-4" style="flex: 3">
          <h1>UserView</h1>
          <h4 v-if="userinfo" :style="{ color: color.info }">
            {{ userinfo.email }} + {{ userinfo.role }}
          </h4>
          <div>
            <button @click="handleLogout">Logout</button>
          </div>
        </v-card>
        <!-- This Component uses flex:7 -->
        <UserChat />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import UserChat from "@/components/user/UserChat.vue";

const store = useStore();
const userinfo = computed(() => store.getters["authentication/getUser"]);
const color = computed(() => store.getters["colors/getColor"]);

const handleLogout = async () => store.dispatch("authentication/signOut");
</script>

<style scoped></style>
