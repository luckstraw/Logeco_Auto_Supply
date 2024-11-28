const state = {
  infoDialogVisible: false,
  infoDialogTitle: "",
  infoDialogMessage: "",
  infoDialogType: "", // success, info, warning, error
};

const getters = {
  isDialogVisible: (state) => state.infoDialogVisible,
  dialogTitle: (state) => state.infoDialogTitle,
  dialogMessage: (state) => state.infoDialogMessage,
  dialogType: (state) => state.infoDialogType,
  getErrorMessage: () => (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No user found with this email address. Please check and try again.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Invalid email address. Please enter a valid email.";
      case "auth/email-already-in-use":
        return "This email is already in use. Please use a different email or log in.";
      case "auth/invalid-credential":
        return "Wrong password or email, Please try again.";
      case "auth/missing-email":
        return "Please enter your email address";
      case "auth/missing-password":
        return "Please enter your password";
      default:
        return null; //"An unexpected error occurred. Please try again later."
    }
  },
};

const mutations = {
  SET_DIALOG_VISIBILITY(state, isVisible) {
    state.infoDialogVisible = isVisible;
  },
  SET_DIALOG_TITLE(state, title) {
    state.infoDialogTitle = title;
  },
  SET_DIALOG_MESSAGE(state, message) {
    state.infoDialogMessage = message;
  },
  SET_DIALOG_TYPE(state, type) {
    state.infoDialogType = type;
  },
};

const actions = {
  showDialog({ commit }, { title, message, type }) {
    commit("SET_DIALOG_TITLE", title);
    commit("SET_DIALOG_MESSAGE", message);
    commit("SET_DIALOG_TYPE", type);
    commit("SET_DIALOG_VISIBILITY", true);
  },
  hideDialog({ commit }) {
    commit("SET_DIALOG_VISIBILITY", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
