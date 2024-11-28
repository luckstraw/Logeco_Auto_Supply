import { createApp } from "vue";
import App from "./App.vue";
import vuex from "vuex";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App).use(router).use(vuex).use(store).use(vuetify).mount("#app");
