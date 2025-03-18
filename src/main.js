import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { APP_CONFIG } from "./config/app";

import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

const app = createApp(App);
app.provide("appName", APP_CONFIG.name);

app.use(createPinia());
app.use(router);

app.mount("#app");
