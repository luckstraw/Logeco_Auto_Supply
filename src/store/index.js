import { createStore } from "vuex";
import colors from "./modules/colors";
import footer from "./modules/footer";
import homepage from "./modules/homepage";
import login from "./modules/login";

export default createStore({
  modules: {
    colors,
    footer,
    homepage,
    login,
  },
});
