<template>
  <v-card
    class="fill-height d-flex flex-column justify-center align-center pa-1 rounded-xl"
    ref="mainCard"
  >
    <v-card-title class="text-center text-h3"
      >Garage Slot Schedule</v-card-title
    >

    <!-- Schedule Cell -->
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
              @mouseenter="showCard(day, slot, time, $event)"
              @mouseleave="
                () => {
                  if (!cardFixed) hoveredSchedule = null;
                }
              "
              @mousemove="updateCardPosition"
              @click="handleCellClick(day, slot, time)"
            >
              {{ getScheduleTitle(day, slot, time) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card When Hovered -->
    <v-card
      v-if="hoveredSchedule"
      class="d-flex flex-column rounded-xl"
      :style="{
        top: `${cardPosition.y}px`,
        left: `${cardPosition.x}px`,
        position: 'absolute',
        width: '250px',
        height: '200px',
        border: `1px solid ${color.secondary}`,
      }"
      :color="hoveredSchedule.color"
    >
      <v-card-title class="text-center">{{
        hoveredSchedule.title
      }}</v-card-title>
      <v-card-text class="overflow-auto">
        <strong>Details:</strong><br />
        <p>{{ hoveredSchedule.details }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteSchedule">Delete</v-btn>
        <v-btn
          text
          @click="
            () => {
              cardFixed = false;
              hoveredSchedule = null;
            }
          "
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>

    <!-- Add Schedule Form -->
    <v-menu
      v-model="showForm"
      :close-on-content-click="false"
      location="top center"
      transition="fab-transition"
      persistent
    >
      <template v-slot:activator="{ props }">
        <v-btn class="ma-4 rounded-xl" :color="color.secondary" v-bind="props">
          Add Schedule
        </v-btn>
      </template>

      <v-card
        width="600"
        class="pa-2 rounded-xl"
        :style="{ border: `1px solid ${color.secondary}` }"
      >
        <v-card-title class="text-center">Add New Schedule</v-card-title>
        <v-form>
          <v-row class="ma-0">
            <v-col cols="6">
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="newSchedule.day"
                    :items="days"
                    label="Day"
                    density="compact"
                    variant="outlined"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="newSchedule.slot"
                    :items="slots"
                    label="Slot"
                    density="compact"
                    variant="outlined"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="newSchedule.startTime"
                    :items="times"
                    label="Start Time"
                    density="compact"
                    variant="outlined"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="newSchedule.endTime"
                    :items="times"
                    label="End Time"
                    density="compact"
                    variant="outlined"
                    hide-details
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newSchedule.title"
                    placeholder="Title (must be short)"
                    density="compact"
                    variant="outlined"
                    hide-details
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newSchedule.details"
                    placeholder="Details"
                    density="compact"
                    variant="outlined"
                    hide-details
                    rows="3"
                    max-rows="3"
                    no-resize
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="d-flex flex-column justify-space-between">
              <div>Pick a Color :</div>
              <v-color-picker
                v-model="newSchedule.color"
                canvas-height="100"
                hide-inputs
                width="260"
              />
              <v-card-actions>
                <v-spacer />
                <v-btn @click="showForm = false">Cancel</v-btn>
                <v-btn :color="color.info" @click="addSchedule">Add</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-menu>
  </v-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);

const days = computed(() => store.getters["adminSchedule/getDays"]);
const times = computed(() => store.getters["adminSchedule/getTime"]);
const slots = computed(() => store.getters["adminSchedule/getSlots"]);
const schedules = computed(() => store.getters["adminSchedule/getSchedules"]);

const showForm = ref(false);
const mainCard = ref(null);

const hoveredSchedule = ref(null);
const cardPosition = ref({ x: 0, y: 0 });
const cardFixed = ref(false);

const newSchedule = ref({
  day: null,
  slot: null,
  startTime: null,
  endTime: null,
  title: null,
  details: null,
  color: null,
});

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

const showCard = (day, slot, time, event) => {
  if (!cardFixed.value) {
    const schedule = schedules.value.find(
      (sch) => sch.day === day && sch.slot === slot && sch.startTime === time
    );
    if (schedule) {
      hoveredSchedule.value = schedule;
      updateCardPosition(event);
    }
  }
};

const updateCardPosition = (event) => {
  if (!cardFixed.value && hoveredSchedule.value) {
    const cardWidth = 250 + 10; // Card width including margin
    const cardHeight = 200 + 10; // Card height including margin

    const { left, top, width, height } =
      mainCard.value.$el.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;

    let x = mouseX - cardWidth;
    let y = mouseY - cardHeight;

    // Prevent card from going out of bounds
    if (x < 0) x = cardWidth;
    if (x + cardWidth > width) x = width - cardWidth;
    if (y < 0) y = cardHeight;
    if (y + cardHeight > height) y = height - cardHeight;

    cardPosition.value = { x, y };
  }
};

const handleCellClick = (day, slot, time) => {
  const schedule = schedules.value.find(
    (sch) => sch.day === day && sch.slot === slot && sch.startTime === time
  );

  if (schedule) {
    cardFixed.value = true;
  } else {
    cardFixed.value = false;
    hoveredSchedule.value = null;
  }
};

const getScheduleTitle = (day, slot, time) => {
  const schedule = schedules.value.find(
    (sch) => sch.day === day && sch.slot === slot && sch.startTime === time
  );
  return schedule ? schedule.title : "";
};

const deleteSchedule = async () => {
  if (hoveredSchedule.value) {
    if (
      await store.dispatch(
        "adminSchedule/deleteSchedule",
        hoveredSchedule.value.id
      )
    ) {
      cardFixed.value = false;
      hoveredSchedule.value = null;
    }
  }
};

const addSchedule = async () => {
  if (await store.dispatch("adminSchedule/addSchedule", newSchedule.value)) {
    showForm.value = false;
    Object.keys(newSchedule.value).forEach(
      (key) => (newSchedule.value[key] = null)
    );
  }
};

// height of the schedule block in vh and vw
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
  cursor: pointer;
  writing-mode: vertical-rl;
  text-orientation: upright;
  white-space: nowrap;
  overflow: hidden;
}
.scheduled-cell:hover {
  transform: scale(1.05);
}
</style>
