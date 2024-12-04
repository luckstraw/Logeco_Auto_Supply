const state = {
  loginFormVisible: false,
  image: "/img/background/LoginPic.jpg",
  leftcolum: {
    image: "/img/background/LoginPic.jpg",
    title: "Welcome Back!",
    description: "We are excited to see you again. Please login to continue.",
  },
};

const getters = {
  isLoginFormVisible: (state) => state.loginFormVisible,
  getLoginImage: (state) => state.image,
  getLeftColumn: (state) => state.leftcolum,
};

const mutations = {
  Set_loginFormVisible(state, isVisible) {
    state.loginFormVisible = isVisible;
  },
};

const actions = {
  showLoginForm({ commit }) {
    commit("Set_loginFormVisible", true);
  },
  hideLoginForm({ commit }) {
    commit("Set_loginFormVisible", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
