<template>
  <div>
    <Particles
      id="tsparticles"
      :options="amongUs"
      @load="onParticlesLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { Particles } from '@tsparticles/vue/dist'
import type { Container } from '@tsparticles/engine'

import { amongUs } from '@tsparticles/demo-configs'

const onParticlesLoaded = async (container: Container) => {
  console.log(container)
}
</script>
