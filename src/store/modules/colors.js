const state = {
  colors: {
    primary: "",
    secondary: "#B7171D", // "#B7171D"
    warn: "red",
  },
};

const getters = {
  getColor: (state) => (colorName) => state.colors[colorName],
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
