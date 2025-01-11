import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { auth } from "./firebaseConfig";

loadFonts();

const app = createApp(App);

store.dispatch("colors/fetchColors");
store.dispatch("adminSchedule/generateDays");
store.dispatch("adminSchedule/fetchSchedules");
store.dispatch("adminChat/fetchChatList");
store.dispatch("adminProducts/fetchProductsData");
auth.onAuthStateChanged(async (user) => {
  if (user) {
    await store.dispatch("authentication/fetchUser", user.uid);
  } else {
    store.commit("authentication/CLEAR_USER");
  }
});

app.use(router).use(store).use(vuetify).mount("#app");
