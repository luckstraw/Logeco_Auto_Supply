import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const state = {
  colors: {},
  home: {},
  service: {},
  footer: {},
};

const getters = {
  getColor: (state) => {
    return Object.keys(state.colors)
      .sort()
      .reduce((obj, key) => {
        obj[key] = state.colors[key];
        return obj;
      }, {});
  },
  getHome: (state) => state.home,
  getService: (state) => state.service,
  getFooter: (state) => {
    return Object.keys(state.footer)
      .sort()
      .reduce((obj, key) => {
        obj[key] = state.footer[key];
        return obj;
      }, {});
  },
};

const mutations = {
  SET_COLORS(state, colors) {
    state.colors = colors;
  },
  SET_HOME(state, home) {
    state.home = home;
  },
  SET_SERVICE(state, service) {
    state.service = service;
  },
  SET_FOOTER(state, footer) {
    state.footer = footer;
  },

  // Mutation to update specific fields
  UPDATE_FIELD(state, { module, updates }) {
    if (state[module]) {
      state[module] = { ...state[module], ...updates };
    }
  },
};

const actions = {
  handleError({ dispatch }, error) {
    dispatch("infoDialog/handleError", error, { root: true });
  },

  async fetchSettingsData({ commit, dispatch }) {
    try {
      const settings = ["colors", "home", "service", "footer"];

      for (const setting of settings) {
        const docSnap = await getDoc(doc(db, "Settings", setting));
        if (docSnap.exists()) {
          commit(`SET_${setting.toUpperCase()}`, docSnap.data());
        }
      }
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async updateField({ commit, dispatch }, { module, updates }) {
    const showDialog = {
      message: `Updating the ${module} settings will change the view for users. Are you sure you want to proceed?`,
      type: "warning",
      buttons: [
        {
          text: "Cancel",
          action: () => false,
        },
        {
          text: "Update",
          action: async () => {
            try {
              commit("UPDATE_FIELD", { module, updates });
              const docRef = doc(db, "Settings", module);
              await updateDoc(docRef, updates);
            } catch (error) {
              dispatch("handleError", error);
            }
          },
        },
      ],
    };
    dispatch("infoDialog/showDialog", showDialog, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
