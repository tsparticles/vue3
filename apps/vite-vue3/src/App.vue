<template>
  <Particles
    id="tsparticles"
    :options="particlesConfig"
    :init="particlesInit"
    @load="particlesLoaded"
  />
</template>

<script setup lang="ts">
import { Particles } from "@tsparticles/vue";
import type { Container, Engine } from "@tsparticles/engine";
import { particlesConfig } from "./particles";
import { loadFull } from "tsparticles";

const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container) => {
  console.log(container);
};
</script>
