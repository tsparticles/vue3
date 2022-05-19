import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  plugins: [
    {
      src: "~/plugins/particles.vue3.ts",
      ssr: false,
    },
  ],
});
