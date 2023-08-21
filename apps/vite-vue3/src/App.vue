<script setup lang="ts">
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import configs from "tsparticles-demo-configs";

const options = configs.basic;

const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container) => {
  console.log(container);
};
</script>

<template>
  <vue-particles
    id="tsparticles"
    :options="options"
    :init="particlesInit"
    @load="particlesLoaded"
  />
</template>
