const state = {
  colors: {
    primary: "#B7171D",
    secondary: "#212121",
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
