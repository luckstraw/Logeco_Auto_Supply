<template>
  <!-- eslint-disable -->
  <v-container fluid class="pa-2 ma-0">
    <v-row class="ma-0 justify-center" style="height: 90vh">
      <!-- Profile and Chat -->
      <v-col cols="12" md="3" class="d-flex flex-column" style="gap: 24px">
        <UserProfile />
        <UserChat />
      </v-col>
            <!-- Schedule -->
            <v-col cols="12" md="9" class="d-flex">
        <UserSchedule />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import UserChat from "@/components/user/UserChat.vue";
import UserSchedule from "@/components/user/UserSchedule.vue";
import UserProfile from "@/components/user/UserProfile.vue";
</script>

<style scoped></style>
