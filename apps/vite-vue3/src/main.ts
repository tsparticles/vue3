import { createApp } from "vue";
import App from "./App.vue";
import { loadFull } from "tsparticles";
import { tsParticles } from "@tsparticles/engine";

await loadFull(tsParticles);

const app = createApp(App);

app.mount("#app");
