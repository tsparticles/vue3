<template>
    <div :id="id"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted } from "vue";
import { type Engine, tsParticles } from "@tsparticles/engine";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export type IParticlesProps = ISourceOptions;

let container: Container | undefined, engine: Engine | undefined;

const props = defineProps<{
    id: string;
    options?: IParticlesProps;
    url?: string;
}>();

const emit = defineEmits<{
    (e: "particlesLoaded", container?: Container): void;
}>();

addEventListener("particlesInit", (e: Event) => {
    const evt = e as CustomEvent<Engine>;

    engine = evt.detail;

    loadParticles();
});

const loadParticles = async () => {
    if (!engine) {
        engine = tsParticles;
    }

    container = await engine.load({
        id: props.id,
        url: props.url,
        options: props.options,
    });

    console.log(container?.particles.filter(() => true));

    emit("particlesLoaded", container);
};

onMounted(() => {
    nextTick(() => {
        if (!props.id) {
            throw new Error("Prop 'id' is required!");
        }

        loadParticles();
    });
});

onUnmounted(() => {
    if (!container) {
        return;
    }

    container.destroy();
    container = undefined;
});
</script>
