import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import GStore from "./store";
import 'nprogress/nprogress.css'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).provide('GStore', GStore).mount("#app");
