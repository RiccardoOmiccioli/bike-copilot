import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import './assets/style/theme.css'

import mitt from "mitt";

const app = createApp(App);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.use(router);

app.mount("#app");
