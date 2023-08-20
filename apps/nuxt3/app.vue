<template>
  <div>
    <NuxtWelcome />
    <vue-particles
      id="tsparticles"
      :options="options"
      :particles-init="particlesInit"
      @particles-loaded="particlesLoaded"
    />
  </div>
</template>
<script setup lang="ts">
import { loadFull } from "tsparticles";
import type { IOptions } from "tsparticles-engine";
import {Container} from "tsparticles-engine";

const options = {
  background: {
    color: "#fff"
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    color: {
      value: "#000"
    },
    links: {
      color: "#000",
      enable: true
    },
    move: {
      enable: true
    },
    number: {
      value: 100
    }
  }
} as IOptions

const particlesInit = async (engine) => {
  await loadFull(engine)
  console.log(engine)
}

const particlesLoaded = (container: Container) => {
  console.log(toRaw(container))
}

</script>
<style>
.bg-white {
  background: none !important;
}
</style>
