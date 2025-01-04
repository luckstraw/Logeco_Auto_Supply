import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import admin from "./modules/admin";
import adminChat from "./modules/adminChat";
import authentication from "./modules/authentication";
import colors from "./modules/colors";
import footer from "./modules/footer";
import homepage from "./modules/homepage";
import infoDialog from "./modules/infoDialog";
import loginAndSignUp from "./modules/loginAndSignUp";
import userChat from "./modules/userChat";
import productsView from "./modules/productsView";
import serviceView from "./modules/serviceView";
import adminService from "./modules/adminService";
import adminProduct from "./modules/adminProduct";

export default createStore({
  modules: {
    admin,
    adminChat,
    authentication,
    colors,
    footer,
    homepage,
    infoDialog,
    loginAndSignUp,
    userChat,
    productsView,
    serviceView,
    adminService,
    adminProduct,
  },
  plugins: [createPersistedState()],
});
