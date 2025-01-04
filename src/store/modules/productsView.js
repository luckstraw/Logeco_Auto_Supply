const state = {
  dialogState: {
    dialog: false,
    selectedTitle: "",
    tab: null,
    products: [],
  },
  images: {
    mitsubishi: "https://via.placeholder.com/400x300?text=Mitsubishi",
    honda: "https://via.placeholder.com/400x200?text=Honda",
    placeholder: "https://via.placeholder.com/400x300?text=Product",
  },
  productGroups: {
    mitsubishiProducts: [
      [
        {
          name: "Mitsubishi Tires",
          image: "https://via.placeholder.com/100x100?text=M-Tires",
        },
      ],
      [
        {
          name: "Mitsubishi Belts",
          image: "https://via.placeholder.com/100x100?text=M-Belts",
        },
      ],
      [
        {
          name: "Mitsubishi Battery",
          image: "https://via.placeholder.com/100x100?text=M-Battery",
        },
      ],
      [
        {
          name: "Mitsubishi Oils",
          image: "https://via.placeholder.com/100x100?text=M-Oils",
        },
      ],
    ],
    product2Products: [
      [
        {
          name: "Product 2 Tires",
          image: "https://via.placeholder.com/100x100?text=P2-Tires",
        },
      ],
      [
        {
          name: "Product 2 Belts",
          image: "https://via.placeholder.com/100x100?text=P2-Belts",
        },
      ],
      [
        {
          name: "Product 2 Battery",
          image: "https://via.placeholder.com/100x100?text=P2-Battery",
        },
      ],
      [
        {
          name: "Product 2 Oils",
          image: "https://via.placeholder.com/100x100?text=P2-Oils",
        },
      ],
    ],
    product3Products: [
      [
        {
          name: "Product 3 Tires",
          image: "https://via.placeholder.com/100x100?text=P3-Tires",
        },
      ],
      [
        {
          name: "Product 3 Belts",
          image: "https://via.placeholder.com/100x100?text=P3-Belts",
        },
      ],
      [
        {
          name: "Product 3 Battery",
          image: "https://via.placeholder.com/100x100?text=P3-Battery",
        },
      ],
      [
        {
          name: "Product 3 Oils",
          image: "https://via.placeholder.com/100x100?text=P3-Oils",
        },
      ],
    ],
    hondaProducts: [
      [
        {
          name: "Honda Tires",
          image: "https://via.placeholder.com/100x100?text=H-Tires",
        },
      ],
      [
        {
          name: "Honda Belts",
          image: "https://via.placeholder.com/100x100?text=H-Belts",
        },
      ],
      [
        {
          name: "Honda Battery",
          image: "https://via.placeholder.com/100x100?text=H-Battery",
        },
      ],
      [
        {
          name: "Honda Oils",
          image: "https://via.placeholder.com/100x100?text=H-Oils",
        },
      ],
    ],
    product5Products: [
      [
        {
          name: "Product 5 Tires",
          image: "https://via.placeholder.com/100x100?text=P5-Tires",
        },
      ],
      [
        {
          name: "Product 5 Belts",
          image: "https://via.placeholder.com/100x100?text=P5-Belts",
        },
      ],
      [
        {
          name: "Product 5 Battery",
          image: "https://via.placeholder.com/100x100?text=P5-Battery",
        },
      ],
      [
        {
          name: "Product 5 Oils",
          image: "https://via.placeholder.com/100x100?text=P5-Oils",
        },
      ],
    ],
  },
};

const getters = {
  getDialogState: (state) => state.dialogState,
  getImages: (state) => state.images,
  getProductGroups: (state) => state.productGroups,
};

const actions = {
  openDialog({ commit }, { title, productGroup }) {
    commit("SET_DIALOG_STATE", {
      dialog: true,
      selectedTitle: title,
      products: productGroup,
      tab: 1,
    });
  },
  closeDialog({ commit }) {
    commit("SET_DIALOG_STATE", { dialog: false });
  },
};

const mutations = {
  SET_DIALOG_STATE(state, payload) {
    state.dialogState = { ...state.dialogState, ...payload };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
