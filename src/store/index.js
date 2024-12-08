import { createStore } from "vuex";
import colors from "./modules/colors";
import footer from "./modules/footer";
import homepage from "./modules/homepage";
import loginAndSignUp from "./modules/loginAndSignUp";

export default createStore({
  modules: {
    colors,
    footer,
    homepage,
    loginAndSignUp,
  },
});
