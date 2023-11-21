<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
                show: false,
            }
        },
        props: {
        },
        mounted() {
            this.emitter.on('toggleMenu', () => {
                this.show = !this.show;
            });
        },
        methods: {
        },
    });
</script>

<template>
    <div class="menu-container" :class="{expanded: show}">
        <div class="menu-row">
            <span class="material-symbols-outlined">sync</span>
            <span class="material-symbols-outlined" @click="this.show = false">close</span>
        </div>
        <div class="menu-row">
            <p>fullscreen</p>
            <span class="material-symbols-outlined" @click="this.emitter.emit('toggleFullscreen')">fullscreen</span>
        </div>
        <div class="menu-row">
            <p>temperature</p>
            <p>20</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .menu-container {
        position: absolute;
        bottom: -100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        padding: var(--large);
        background-color: var(--neutral-000);
        transition-duration: 500ms;
        transition-timing-function: cubic-bezier(0.5,0.25,0,1);
        gap: var(--large);
    }

    .expanded {
        bottom: 0%;
    }

    .menu-row {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>