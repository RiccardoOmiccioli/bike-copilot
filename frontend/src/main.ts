import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
// import './assets/style/material_theme.css';
import './assets/style/theme.css'

import mitt from "mitt";

const emitter = mitt();

const app = createApp(App);

app.config.globalProperties.emitter = emitter;

app.use(router);

app.mount("#app");
