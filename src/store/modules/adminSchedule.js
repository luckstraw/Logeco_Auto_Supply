import { db } from "@/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const state = {
  days: [],
  time: [
    "8-9:00 AM",
    "9-10:00 AM",
    "10-11:00 AM",
    "11-12:00 PM",
    "12-1:00 PM",
    "1-2:00 PM",
    "2-3:00 PM",
    "3-4:00 PM",
    "4-5:00 PM",
    "5-6:00 PM",
  ],
  slots: ["1", "2"],
  schedules: [],
};

const getters = {
  getDays: (state) => state.days,
  getTime: (state) => state.time,
  getSlots: (state) => state.slots,
  getSchedules: (state) => state.schedules,
};

const mutations = {
  SET_DAYS(state, days) {
    state.days = days;
  },
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules;
  },
  ADD_SCHEDULE(state, schedule) {
    state.schedules.push(schedule);
  },
  DELETE_SCHEDULE(state, id) {
    state.schedules = state.schedules.filter((schedule) => schedule.id !== id);
  },
};

const actions = {
  handleError({ dispatch }, error) {
    dispatch("infoDialog/handleError", error, { root: true });
  },

  generateDays({ commit, dispatch }) {
    try {
      const daysArray = [];
      const currentDate = new Date();

      for (let i = 0; i <= 10; i++) {
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + i);

        const dayLabel = futureDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        daysArray.push(dayLabel);
      }
      commit("SET_DAYS", daysArray);
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async fetchSchedules({ commit, dispatch }) {
    try {
      const querySnapshot = await getDocs(collection(db, "Schedules"));
      const schedules = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      commit("SET_SCHEDULES", schedules);
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async addSchedule({ commit, state, dispatch }, newSchedule) {
    try {
      // Basic validation
      const requiredFields = [
        "day",
        "slot",
        "startTime",
        "endTime",
        "title",
        "details",
        "color",
      ];
      if (requiredFields.some((field) => !newSchedule[field])) {
        throw new Error("Please fill all required fields");
      }

      // Time validation
      const startIndex = state.time.indexOf(newSchedule.startTime);
      const endIndex = state.time.indexOf(newSchedule.endTime);
      if (startIndex > endIndex) {
        throw new Error("End time must be later than start time");
      }

      // Conflict check
      const hasConflict = state.schedules.some(
        (schedule) =>
          schedule.day === newSchedule.day &&
          schedule.slot === newSchedule.slot &&
          Math.max(startIndex, state.time.indexOf(schedule.startTime)) <=
            Math.min(endIndex, state.time.indexOf(schedule.endTime))
      );

      if (hasConflict) {
        throw new Error("Schedule conflicts with existing booking");
      }

      const docRef = await addDoc(collection(db, "Schedules"), newSchedule);
      commit("ADD_SCHEDULE", { id: docRef.id, ...newSchedule });
      return true;
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async deleteSchedule({ commit, dispatch }, id) {
    try {
      if (!id) {
        throw new Error("Schedule ID is required");
      }
      await deleteDoc(doc(db, "Schedules", id));
      commit("DELETE_SCHEDULE", id);
      return true;
    } catch (error) {
      dispatch("handleError", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
