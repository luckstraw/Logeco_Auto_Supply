import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import admin from "./modules/admin";
import adminChat from "./modules/adminChat";
import adminProducts from "./modules/adminProducts";
import adminServices from "./modules/adminServices";
import adminSchedule from "./modules/adminSchedule";
import adminSettings from "./modules/adminSettings";
import authentication from "./modules/authentication";
import homepage from "./modules/homepage";
import infoDialog from "./modules/infoDialog";
import loginAndSignUp from "./modules/loginAndSignUp";
import userChat from "./modules/userChat";

export default createStore({
  modules: {
    admin,
    adminChat,
    adminProducts,
    adminSchedule,
    adminSettings,
    adminServices,
    authentication,
    homepage,
    infoDialog,
    loginAndSignUp,
    userChat,
  },
  plugins: [createPersistedState()],
});
