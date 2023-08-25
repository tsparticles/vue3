<template>
  <Particles
    id="tsparticles"
    :options="amongUs"
    @load="particlesLoaded"
  />
</template>

<script setup lang="ts">
import { Particles } from "@tsparticles/vue";
import type { Container } from "@tsparticles/engine";

import { amongUs } from "@tsparticles/demo-configs";

const particlesLoaded = async (container: Container) => {
  console.log(container);
};
</script>
