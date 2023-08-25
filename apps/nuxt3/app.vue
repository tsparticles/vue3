<template>
  <div>
    <ClientOnly>
      <Particles
        id="tsparticles"
        :options="amongUs"
        @load="particlesLoaded"
      />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { Particles } from '@tsparticles/vue'
import { loadFull } from 'tsparticles'
import { tsParticles } from '@tsparticles/engine'
import { particlesConfig } from '~/lib/particles'
import type { Container } from '@tsparticles/engine'

import { amongUs } from '@tsparticles/demo-configs'

if(process.client) {
  await loadFull(tsParticles)
}

const particlesLoaded = (container: Container) => {
  console.log(container)
}
</script>
