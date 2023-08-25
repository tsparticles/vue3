import { loadFull } from "tsparticles";
import { tsParticles } from '@tsparticles/engine'

export default async () => {
  await loadFull(tsParticles)
}
