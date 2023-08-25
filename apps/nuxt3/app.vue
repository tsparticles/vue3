<template>
  <div>
    <ClientOnly>
      <Particles
        id="tsparticles"
        :options="config"
        @load="particlesLoaded"
      />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { Particles } from '@tsparticles/vue'
import { loadFull } from 'tsparticles'
import { tsParticles } from '@tsparticles/engine'
import type { Container } from '@tsparticles/engine'

const config = ref({})

if(process.client) {
  await loadFull(tsParticles)
  config.value = (await import('@tsparticles/configs')).default.amongUs
}

const particlesLoaded = (container: Container) => {
  console.log(container)
}
</script>
