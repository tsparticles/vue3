import { createApp } from "vue";
import App from "./App.vue";
import { loadFull } from "tsparticles";
import { tsParticles } from "@tsparticles/engine";

const app = createApp(App);

(async () => {
  await loadFull(tsParticles);
  app.mount("#app");
})();
