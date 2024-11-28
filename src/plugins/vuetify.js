// Styles
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure Font Awesome is imported
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";

export default createVuetify({
  icons: {
    defaultSet: "fa", // Set Font Awesome as the default icon set
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: "dark",
  },
});
