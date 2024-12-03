const state = {
  colors: {
    primary: "var(--primary-color)",
    secondary: "cyan", // "#B7171D" original color, cyn just for testing
    accent: "",
    error: "",
    warning: "red",
    info: "",
    success: "",
  },
};

const getters = {
  getColor: (state) => state.colors,
};

const mutations = {
  setColor(state, { colorName, colorValue }) {
    state.colors[colorName] = colorValue;
  },
};

const actions = {
  updateColor({ commit }, payload) {
    commit("setColor", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
