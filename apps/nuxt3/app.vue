<template>
  <div>
    <ClientOnly>
      <Particles
        id="tsparticles"
        :options="particlesConfig"
        :init="particlesInit"
        @load="particlesLoaded"
      />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { Particles } from '@tsparticles/vue'
import { loadFull } from 'tsparticles'
import { particlesConfig } from '~/lib/particles'
import type { Container, Engine } from '@tsparticles/engine'

const particlesInit = async (engine: Engine) => {
  console.log('init')
  console.log(engine)
  await loadFull(engine)
}

const particlesLoaded = (container: Container) => {
  console.log(container)
}
</script>
