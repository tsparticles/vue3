<template>
  <div>
    <ClientOnly>
      <Particles
        id="tsparticles"
        :options="options"
        :init="particlesInit"
        @load="particlesLoaded"
      />
    </ClientOnly>
    <NuxtWelcome :style="{ zIndex: 999, background: '#fff' }" />
  </div>
</template>
<script setup lang="ts">
import { loadFull } from "tsparticles";
import type { ISourceOptions, Container, Engine } from "tsparticles-engine";
import configs from "tsparticles-demo-configs";

const options = configs.basic

const particlesInit = async (engine: Engine) => {
  await loadFull(engine)
}

const particlesLoaded = (container: Container) => {
  console.log(container)
}

</script>
