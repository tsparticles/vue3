<template>
    <div :id="id"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { tsParticles } from "tsparticles-engine";
import type { Container, ISourceOptions, Engine } from "tsparticles-engine";

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;

const container = ref<Container | undefined>();

const props = defineProps<{
    id: string;
    options?: IParticlesProps;
    url?: string;
    particlesInit?: (engine: Engine) => Promise<void>;
}>();

const emit = defineEmits<{
    (e: "particlesLoaded", container: Container): void;
}>();

onMounted(() => {
    nextTick(async () => {
        if (!props.id) {
            throw new Error("Prop 'id' is required!");
        }

        tsParticles.init();

        if (props.particlesInit) {
            await props.particlesInit(tsParticles);
        }

        container.value = await tsParticles.load({
            id: props.id,
            url: props.url,
            options: props.options,
        });

        if (container.value) {
            emit("particlesLoaded", container.value);
        }
    });
});

onUnmounted(() => {
    if (container.value) {
        container.value.destroy();

        container.value = undefined;
    }
});
</script>
