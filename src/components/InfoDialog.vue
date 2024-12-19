<template>
  <v-dialog v-model="isDialogVisible" persistent max-width="400px">
    <v-card
      :style="{
        borderColor: cardColor,
        borderWidth: '2px',
        borderStyle: 'solid',
      }"
    >
      <v-card-title :style="{ color: cardColor }" class="d-flex align-center">
        <v-icon v-if="dialogIcon" class="mr-2">{{ dialogIcon }}</v-icon>
        {{ dialogTitle }}
      </v-card-title>

      <v-card-text>{{ dialogMessage }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-for="(button, index) in dialogButtons"
          :key="index"
          @click="button.action"
        >
          {{ button.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isDialogVisible = computed(
  () => store.getters["infoDialog/isDialogVisible"]
);
const dialogTitle = computed(() => store.getters["infoDialog/dialogTitle"]);
const dialogMessage = computed(() => store.getters["infoDialog/dialogMessage"]);
const dialogType = computed(() => store.getters["infoDialog/dialogType"]);
const dialogIcon = computed(() => store.getters["infoDialog/dialogIcon"]);
const dialogButtons = computed(() => store.getters["infoDialog/dialogButtons"]);

const colors = computed(() => store.getters["colors/getColor"]);
const cardColor = computed(() => colors.value[dialogType.value]);
</script>

<style scoped></style>
