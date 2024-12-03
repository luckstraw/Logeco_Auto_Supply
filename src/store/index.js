import { createStore } from "vuex";
import colors from "./modules/colors";
import footer from "./modules/footer";
import homepage from "./modules/homepage";

export default createStore({
  modules: {
    colors,
    footer,
    homepage,
  },
});
