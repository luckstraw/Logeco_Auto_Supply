<template>
  <!-- eslint-disable -->
  <v-card
    class="flex-grow-1 d-flex flex-column justify-center align-center rounded-xl"
    style="overflow-x: auto; white-space: nowrap; width: 100%;"
  >
    <v-progress-linear
      v-if="loading"
      :color="color.secondary"
      indeterminate
      style="position: absolute; top: 0; left: 0; right: 0; z-index: 1"
    ></v-progress-linear>
    <v-card-title class="text-center text-h3">
      Garage Slot Schedule
    </v-card-title>
    <div class="d-flex flex-row">
      <div class="d-flex flex-column">
        <div :style="spacer" class="d-flex justify-center align-center text-h4">
          {{ new Date().getFullYear() }}
        </div>
        <div
          v-for="time in times"
          :key="time"
          class="d-flex justify-center align-center"
          :style="timeCellSize"
        >
          {{ time }}
        </div>
      </div>
      <div v-for="day in days" :key="day" class="d-flex flex-column">
        <div class="d-flex justify-center align-center" :style="dayCellSize">
          {{ day }}
        </div>
        <div class="d-flex flex-row">
          <div class="d-flex flex-column" v-for="slot in slots" :key="slot">
            <div
              class="d-flex justify-center align-center"
              :style="slotCellSize"
            >
              {{ slot }}
            </div>
            <div
              v-for="time in times"
              :key="time"
              :style="getCellStyle(day, slot, time)"
              :class="getCellStyle(day, slot, time).className"
            >
              {{ getScheduleTitle(day, slot, time) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-btn
      class="ma-4 rounded-xl"
      :color="color.secondary"
      @click="handleRefresh"
      :disabled="isRefreshing"
    >
      Refresh Schedule
    </v-btn>
  </v-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["adminSettings/getColor"]);

const days = computed(() => store.getters["adminSchedule/getDays"]);
const times = computed(() => store.getters["adminSchedule/getTime"]);
const slots = computed(() => store.getters["adminSchedule/getSlots"]);
const schedules = computed(() => store.getters["adminSchedule/getSchedules"]);

const loading = ref(false);
const isRefreshing = ref(false);

const getCellStyle = (day, slot, time) => {
  const matchingSchedules = schedules.value.filter(
    (sch) => sch.day === day && sch.slot === slot
  );

  for (const schedule of matchingSchedules) {
    const startIndex = times.value.indexOf(schedule.startTime);
    const endIndex = times.value.indexOf(schedule.endTime);
    const currentIndex = times.value.indexOf(time);

    if (startIndex !== -1 && endIndex !== -1) {
      if (currentIndex === startIndex) {
        return {
          className: "scheduled-cell",
          height: `${(endIndex - startIndex + 1) * ((9 / 100) * height)}px`,
          width: `${(5 / 100) * width}px`,
          backgroundColor: schedule.color,
        };
      }

      if (currentIndex > startIndex && currentIndex <= endIndex) {
        return {
          display: "none",
        };
      }
    }
  }

  return {
    height: `${(9 / 100) * height}px`,
    width: `${(5 / 100) * width}px`,
    borderBottom: "1px dashed white",
    borderRight: "1px dashed white",
  };
};

const getScheduleTitle = (day, slot, time) => {
  const schedule = schedules.value.find(
    (sch) => sch.day === day && sch.slot === slot && sch.startTime === time
  );
  return schedule ? "Booked" : "";
};

const handleRefresh = async () => {
  if (isRefreshing.value) return;

  loading.value = isRefreshing.value = true;

  await store.dispatch("adminSchedule/fetchSchedules");
  setTimeout(() => {
    loading.value = false;
    isRefreshing.value = false;
  }, 1000);
};

const height = window.innerHeight * 0.6;
const width = window.innerWidth * 0.55;

const timeCellSize = computed(() => ({
  height: `${(9 / 100) * height}px`,
  width: `${(166 / 1000) * width}px`,
  border: "1px solid white",
}));

const dayCellSize = computed(() => ({
  height: `${(9 / 100) * height}px`,
  width: `${(1 / 10) * width}px`,
  border: "1px solid white",
}));

const slotCellSize = computed(() => ({
  height: `${(45 / 1000) * height}px`,
  width: `${(5 / 100) * width}px`,
  border: "1px solid white",
}));

const spacer = computed(() => ({
  height: `${(135 / 1000) * height}px`,
  width: `${(166 / 1000) * width}px`,
}));
</script>

<style scoped>
.scheduled-cell {
  transition: transform 0.2s ease;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  text-orientation: upright;
  white-space: nowrap;
  overflow: hidden;
}
</style>
