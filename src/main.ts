import { createApp } from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import router from "./routes.ts";
import i18n from "./i18n.ts";

createApp(App).use(router).use(i18n).mount('#app')
