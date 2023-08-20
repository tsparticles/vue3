import { createApp } from "vue";
import Particles from "vue3-particles";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(Particles);

app.mount("#app");
