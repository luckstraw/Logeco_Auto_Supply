const state = {
  loginSignUp_FormVisible: false,

  loginLeftColumn: {
    image: "https://i.imgur.com/hkgIPhk.jpeg",
    title: "Welcome Back!",
    description: "We are excited to see you again. Please login to continue.",
  },
  signUpRightColumn: {
    image: "https://i.imgur.com/lZtpVdR.jpeg",
    title: "Create an Account!",
    description: "Join us and explore amazing features. Sign up now!",
  },
};

const getters = {
  isLoginSignUp_FormVisible: (state) => state.loginSignUp_FormVisible,

  getLeftColumn: (state) => state.loginLeftColumn,
  getRightColumn: (state) => state.signUpRightColumn,
};

const mutations = {
  SET_loginSignUp_FormVisible(state, payload) {
    state.loginSignUp_FormVisible = payload;
  },
};

const actions = {
  showLoginSignUpForm({ commit }) {
    commit("SET_loginSignUp_FormVisible", true);
  },
  hideLoginSignUpForm({ commit }) {
    commit("SET_loginSignUp_FormVisible", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
