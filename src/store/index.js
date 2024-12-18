import { createStore } from "vuex";
import colors from "./modules/colors";
import footer from "./modules/footer";
import homepage from "./modules/homepage";
import loginAndSignUp from "./modules/loginAndSignUp";
import authentication from "./modules/authentication";
import infoDialog from "./modules/infoDialog";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    colors,
    footer,
    homepage,
    loginAndSignUp,
    authentication,
    infoDialog,
  },
  plugins: [createPersistedState()],
});
