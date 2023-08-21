import { createApp } from "vue";
import { ParticlesPlugin } from "@tsparticles/vue";
import App from "./App.vue";

const app = createApp(App);

app.use(ParticlesPlugin);

app.mount("#app");
