const state = {
  dialog: false,
  editingService: false,
  editIndex: null,
  newService: {
    title: "",
    description: "",
    image: "",
  },
  services: [
    {
      title: "Oil Change",
      description: "Quick and efficient oil changes for all vehicle types.",
      image: "https://via.placeholder.com/300x200/FF0000",
    },
    {
      title: "Tire Replacement",
      description: "High-quality tire replacements and alignment services.",
      image: "https://via.placeholder.com/300x200/00FF00",
    },
    {
      title: "Brake Repair",
      description: "Ensure safety with our comprehensive brake repair service.",
      image: "https://via.placeholder.com/300x200/0000FF",
    },
  ],
};

const getters = {
  getDialogState: (state) => state.dialog,
  getEditingService: (state) => state.editingService,
  getEditIndex: (state) => state.editIndex,
  getNewService: (state) => state.newService,
  getServices: (state) => state.services,
};

const actions = {
  openAddDialog({ commit }) {
    commit("SET_EDITING_SERVICE", false);
    commit("SET_NEW_SERVICE", { title: "", description: "", image: "" });
    commit("SET_DIALOG_STATE", true);
  },
  editService({ commit }, index) {
    commit("SET_EDITING_SERVICE", true);
    commit("SET_EDIT_INDEX", index);
    commit("SET_NEW_SERVICE", { ...state.services[index] });
    commit("SET_DIALOG_STATE", true);
  },
  saveService({ commit, state }) {
    if (state.editingService) {
      commit("UPDATE_SERVICE", {
        index: state.editIndex,
        service: { ...state.newService },
      });
    } else {
      commit("ADD_SERVICE", { ...state.newService });
    }
    commit("SET_DIALOG_STATE", false);
  },
  removeService({ commit }, index) {
    commit("REMOVE_SERVICE", index);
  },
  closeDialog({ commit }) {
    commit("SET_DIALOG_STATE", false);
  },
};

const mutations = {
  SET_DIALOG_STATE(state, payload) {
    state.dialog = payload;
  },
  SET_EDITING_SERVICE(state, payload) {
    state.editingService = payload;
  },
  SET_EDIT_INDEX(state, payload) {
    state.editIndex = payload;
  },
  SET_NEW_SERVICE(state, payload) {
    state.newService = payload;
  },
  ADD_SERVICE(state, payload) {
    state.services.push(payload);
  },
  UPDATE_SERVICE(state, { index, service }) {
    state.services.splice(index, 1, service);
  },
  REMOVE_SERVICE(state, index) {
    state.services.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
