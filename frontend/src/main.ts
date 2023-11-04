import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import './assets/style/material_theme.css';
import './assets/style/theme.css'

const app = createApp(App);

app.use(router);

app.mount("#app");
