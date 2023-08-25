<template>
  <div>
    <Particles
      id="tsparticles"
      :options="particlesConfig"
      :init="initParticles"
      @load="onParticlesLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { Particles } from '@tsparticles/vue/dist'
import type { Engine, Container } from '@tsparticles/engine'
import { loadFull } from 'tsparticles'
import { particlesConfig } from '~/lib/particles'

const initParticles = async (engine: Engine) => {
  await loadFull(engine)
}

const onParticlesLoaded = async (container: Container) => {
  console.log(container)
}
</script>
