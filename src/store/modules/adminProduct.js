const state = {
  dialog: false,
  openCards: [
    {
      image: "https://via.placeholder.com/300x200",
      title: "Card 1",
      buttonText: "View Details",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Card 2",
      buttonText: "View Details",
    },
  ],
  items: [
    {
      image: "https://via.placeholder.com/150x150",
      title: "Item 1",
    },
    {
      image: "https://via.placeholder.com/150x150",
      title: "Item 2",
    },
  ],
};

const getters = {
  getDialogState: (state) => state.dialog,
  getOpenCards: (state) => state.openCards,
  getItems: (state) => state.items,
};

const actions = {
  addItem({ commit }) {
    commit("ADD_ITEM");
  },
  removeItem({ commit }, title) {
    commit("REMOVE_ITEM", title);
  },
  addCategory({ commit }) {
    commit("ADD_CATEGORY");
  },
};

const mutations = {
  SET_DIALOG_STATE(state, payload) {
    state.dialog = payload;
  },
  ADD_ITEM(state) {
    state.items.push({
      image: "https://via.placeholder.com/150x150",
      title: `Item ${state.items.length + 1}`,
    });
  },
  REMOVE_ITEM(state, title) {
    state.items = state.items.filter((item) => item.title !== title);
  },
  ADD_CATEGORY(state) {
    state.openCards.push({
      image: "https://via.placeholder.com/300x200",
      title: `Card ${state.openCards.length + 1}`,
      buttonText: "View Details",
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
