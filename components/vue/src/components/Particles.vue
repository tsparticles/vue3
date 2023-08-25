<template>
    <div :id="id" />
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref, onUnmounted } from "vue-demi";
import { tsParticles } from "@tsparticles/engine";
import type { Container as ParticlesContainer, ISourceOptions as ParticleOptions } from "@tsparticles/engine";

const props = defineProps<{
    id: string;
    options?: ParticleOptions;
    url?: string;
}>();

const emit = defineEmits<{
    (e: "load", container: ParticlesContainer): void;
}>();

if (!props.id) {
    throw new Error(`Prop 'id' is required`);
}

const container = ref<ParticlesContainer | undefined>();

onMounted(() => {
    nextTick(async () => {
        tsParticles.init();

        container.value = await tsParticles.load({
            id: props.id,
            url: props.url,
            options: props.options,
        });

        if (container.value) {
            emit("load", container.value);
        }
    });
});

onUnmounted(() => {
    if (!container.value) {
        return;
    }

    container.value.destroy();
});
</script>
