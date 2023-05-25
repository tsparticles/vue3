import type { App } from "vue";
import particles from "./Particles.vue";

const VueParticles = (app: App) => {
    app.component("Particles", particles);
    app.component("vue-particles", particles);
};

export { particles as ParticlesComponent };
export default VueParticles;
