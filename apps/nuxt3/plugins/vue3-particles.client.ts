import { ParticlesPlugin } from '@tsparticles/vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(ParticlesPlugin)
})
