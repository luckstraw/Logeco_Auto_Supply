import { createStore } from "vuex";
import colors from "./modules/colors";
import footer from "./modules/footer";

export default createStore({
  modules: {
    colors,
    footer,
  },
});
