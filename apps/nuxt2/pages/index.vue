<template>
  <div>
    <Particles
      id="tsparticles"
      :options="configs.amongUs"
      @load="onParticlesLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { Particles } from '@tsparticles/vue/dist'
import type { Container } from '@tsparticles/engine'
import configs from '@tsparticles/configs'

const onParticlesLoaded = async (container: Container) => {
  console.log(container)
}
</script>
