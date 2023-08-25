<template>
  <Particles
    id="tsparticles"
    :options="configs.amongUs"
    @load="particlesLoaded"
  />
</template>

<script setup lang="ts">
import { Particles } from "@tsparticles/vue";
import type { Container } from "@tsparticles/engine";
import configs from "@tsparticles/configs";

const particlesLoaded = async (container: Container) => {
  console.log(container);
};
</script>
