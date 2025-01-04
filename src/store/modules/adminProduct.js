const state = {
  dialog: false,
  openCards: [
    {
      title: "Mitsubishi Items",
      image: "https://via.placeholder.com/300x200/0000FF", // Replace with an actual image URL
      buttonText: "Add items",
    },
    {
      title: "Honda Items",
      image: "https://via.placeholder.com/300x200/FF0000", // Replace with an actual image URL
      buttonText: "Add items",
    },
    {
      title: "Toyota Items",
      image: "https://via.placeholder.com/300x200/00FF00", // Replace with an actual image URL
      buttonText: "Add items",
    },
    {
      title: "Suzuki Items",
      image: "https://via.placeholder.com/300x200/FFFF00", // Replace with an actual image URL
      buttonText: "Add items",
    },
  ],
  items: [
    {
      title: "Suspension",
      image: "https://via.placeholder.com/150/0000FF", // Replace with actual image URLs
    },
    {
      title: "Headlights",
      image: "https://via.placeholder.com/150/FF0000", // Replace with actual image URLs
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
    const newItem = {
      title: "New Item",
      image: "https://via.placeholder.com/150/AAAAAA", // Default image for new item
    };
    commit("ADD_ITEM", newItem);
    console.log("New item added:", newItem);
  },
  removeItem({ commit }, title) {
    commit("REMOVE_ITEM", title);
  },
  addCategory({ commit }) {
    const newCategory = {
      title: "New Category",
      image: "https://via.placeholder.com/300x200/AAAAAA", // Default image for new category
      buttonText: "Add items",
    };
    commit("ADD_CATEGORY", newCategory);
    console.log("New category added:", newCategory);
  },
};

const mutations = {
  SET_DIALOG_STATE(state, payload) {
    state.dialog = payload;
  },
  ADD_ITEM(state, newItem) {
    state.items.push(newItem);
  },
  REMOVE_ITEM(state, title) {
    state.items = state.items.filter((item) => item.title !== title);
  },
  ADD_CATEGORY(state, newCategory) {
    state.openCards.push(newCategory);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
