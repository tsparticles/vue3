<template>
    <div :id="id"></div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import type { PropType } from "vue";
import { tsParticles } from "tsparticles-engine";
import type { Container, ISourceOptions, Engine } from "tsparticles-engine";

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;

let container: Container | undefined;

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true,
        },
        options: {
            type: Object as PropType<IParticlesProps>,
        },
        url: {
            type: String,
        },
        particlesLoaded: {
            type: Function as PropType<(container: Container) => void>,
        },
        particlesInit: {
            type: Function as PropType<(engine: Engine) => Promise<void>>,
        },
    },
    mounted(): void {
        nextTick(async () => {
            if (!this.id) {
                throw new Error("Prop 'id' is required!");
            }

            tsParticles.init();

            if (this.particlesInit) {
                await this.particlesInit(tsParticles);
            }

            container = await tsParticles.load({
                id: this.id,
                url: this.url,
                options: this.options,
            });

            if (this.particlesLoaded && container) {
                this.particlesLoaded(container);
            }
        });
    },
    unmounted(): void {
        if (container) {
            container.destroy();

            container = undefined;
        }
    },
});
</script>
