<template>
    <div :id="id"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import { type Container, type ISourceOptions, type Engine, tsParticles } from "@tsparticles/engine";

export type IParticlesProps = ISourceOptions;

let container: Container | undefined, engine: Engine | undefined;

const props = defineProps<{
    id: string;
    options?: IParticlesProps;
    url?: string;
    theme?: string;
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

watch(
    () => props.theme,
    () => {
        container?.loadTheme(props.theme);
    },
    { immediate: true, deep: true },
);
</script>
