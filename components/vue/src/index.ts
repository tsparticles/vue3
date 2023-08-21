import type { App } from "vue-demi";
import ParticlesComponent from "./components/Particles.vue";

export const ParticlesPlugin = {
    install(app: App): void {
        app.component("Particles", ParticlesComponent);
        app.component("vue-particles", ParticlesComponent);
    },
};

export { default as ParticlesComponent } from "./components/Particles.vue";
