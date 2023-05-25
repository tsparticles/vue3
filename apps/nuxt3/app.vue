<template>
    <div>
        <NuxtWelcome />
        <Particles
            id="tsparticles"
            :options="options"
            :particles-init="particlesInit"
        />
    </div>
</template>
<script>
import { loadFull } from "tsparticles";

export default {
    name: "NuxtTutorial",
    data() {
        return {
            options: {
                background: {
                    color: "#fff"
                },
                fullScreen: {
                    enable: true,
                    zIndex: -1
                },
                particles: {
                    color: {
                        value: "#000"
                    },
                    links: {
                        color: "#000",
                        enable: true
                    },
                    move: {
                        enable: true
                    },
                    number: {
                        value: 100
                    }
                }
            }
        };
    },
    methods: {
        particlesInit: async (engine) => {
            await loadFull(engine);
        }
    }
};
</script>
<style>
.bg-white {
    background: none !important;
}
</style>
