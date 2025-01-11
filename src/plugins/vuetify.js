import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
import { VFileUpload } from "vuetify/labs/VFileUpload";

export default createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: "dark",
  },
  components: {
    VFileUpload,
  },
});
