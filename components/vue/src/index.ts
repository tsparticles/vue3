import type { App } from "vue-demi";
import Particles from "./components/Particles.vue";

export const ParticlesPlugin = {
    install(app: App): void {
        app.component("Particles", Particles);
        app.component("vue-particles", Particles);
    },
};

export { default as Particles } from "./components/Particles.vue";
