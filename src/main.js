import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import GStore from "./store";
import { createPinia } from 'pinia'
import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount("#app");
