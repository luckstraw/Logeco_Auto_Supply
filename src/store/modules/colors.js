import { db } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const state = {
  colors: {},
};

const getters = {
  getColor: (state) => state.colors,
};

const mutations = {
  SET_COLORS(state, colors) {
    state.colors = colors;
  },
};

const actions = {
  fetchColors({ commit }) {
    const colorsDoc = doc(db, "Settings", "colors");
    onSnapshot(colorsDoc, (doc) => {
      if (doc.exists()) {
        commit("SET_COLORS", doc.data());
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
