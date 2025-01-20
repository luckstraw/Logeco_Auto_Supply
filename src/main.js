import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { auth } from "./firebaseConfig";
import Aos from "aos";
import "aos/dist/aos.css";

loadFonts();

const app = createApp(App);

store.dispatch("adminSettings/fetchSettingsData");
store.dispatch("colors/fetchColors");
store.dispatch("adminSchedule/generateDays");
store.dispatch("adminSchedule/fetchSchedules");
store.dispatch("adminChat/fetchChatList");
store.dispatch("adminProducts/fetchProductsData");
store.dispatch("adminServices/fetchServicesData");

Aos.init();

auth.onAuthStateChanged(async (user) => {
  if (user) {
    await store.dispatch("authentication/fetchUser", user.uid);
  } else {
    store.commit("authentication/CLEAR_USER");
  }
});

app.use(router).use(store).use(vuetify).mount("#app");
