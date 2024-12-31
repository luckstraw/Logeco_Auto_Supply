import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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
  handleError({ dispatch }, error) {
    dispatch("infoDialog/handleError", error, { root: true });
  },

  async fetchColors({ commit, dispatch }) {
    try {
      const colorsDoc = doc(db, "Settings", "colors");
      const docSnap = await getDoc(colorsDoc);
      if (docSnap.exists()) {
        commit("SET_COLORS", docSnap.data());
      }
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
