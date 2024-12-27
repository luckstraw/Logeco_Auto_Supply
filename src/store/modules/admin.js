const state = {
  selectedComponentKey: "AdminOverview",
};

const getters = {
  selectedComponentKey: (state) => state.selectedComponentKey,
};

const mutations = {
  SET_SELECTED_COMPONENT_KEY(state, key) {
    state.selectedComponentKey = key;
  },
};

const actions = {
  selectComponent({ commit }, key) {
    commit("SET_SELECTED_COMPONENT_KEY", key);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
