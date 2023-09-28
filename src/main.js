import "./assets/main.css";
import "./assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
import { VueFire } from "vuefire";
import { firebaseApp } from "./firebase/config.js";

const app = createApp(App);

app.use(router).use(store).use(VueFire, { firebaseApp });

app.mount("#app");
