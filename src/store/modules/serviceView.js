const state = {
  items: [
    {
      src: "",
      title: "PMS",
      description:
        "Periodic Maintenance Service is a schedule of planned maintenance activities aimed to prevent any breakdowns and failures of your car.",
    },
    {
      src: "",
      title: "Suspension",
      description: "fixing and maintaining a car suspension.",
    },
    {
      src: "",
      title: "Engine Analyzer",
      description:
        "The portable engine analyzer is a professional tool for testing overall performance of vehicle engines.",
    },
    {
      src: "",
      title: "Filler",
      description: "Golden hour vibes with effortless summer style.",
    },
    {
      src: "",
      title: "Sample Service",
      description: "Adventures and sunsets shared with great company.",
    },
  ],
};

const getters = {
  getItems: (state) => state.items,
};

const mutations = {};
const actions = {};
const modules = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
