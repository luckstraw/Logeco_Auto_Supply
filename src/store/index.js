import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import admin from "./modules/admin";
import adminChat from "./modules/adminChat";
import adminProducts from "./modules/adminProducts";
import adminService from "./modules/adminService";
import adminSchedule from "./modules/adminSchedule";
import authentication from "./modules/authentication";
import colors from "./modules/colors";
import footer from "./modules/footer";
import homepage from "./modules/homepage";
import infoDialog from "./modules/infoDialog";
import loginAndSignUp from "./modules/loginAndSignUp";
import productsView from "./modules/productsView";
import serviceView from "./modules/serviceView";
import userChat from "./modules/userChat";

export default createStore({
  modules: {
    admin,
    adminChat,
    adminProducts,
    adminSchedule,
    adminService,
    authentication,
    colors,
    footer,
    homepage,
    infoDialog,
    loginAndSignUp,
    productsView,
    serviceView,
    userChat,
  },
  plugins: [createPersistedState()],
});
