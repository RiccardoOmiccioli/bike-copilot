<script lang="js">
    import {defineComponent} from "vue";
    import segmentedButton from "./buttons/segmentedButton.vue";
    import localityComponent from "./localityComponent.vue";
    import weatherComponent from "./weatherComponent.vue";

    export default defineComponent({
        components: { segmentedButton, localityComponent, weatherComponent },
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
            <span class="material-symbols-outlined" @click="this.emitter.emit('updateWeather')">sync</span>
            <span class="material-symbols-outlined" @click="this.emitter.emit('toggleFullscreen')">fullscreen</span>
            <span class="material-symbols-outlined" @click="this.show = false">close</span>
        </div>
        <div class="menu-theme-row">
            <segmentedButton :options="[
                {value: 'dark', id: 'dark', label: 'Dark'},
                {value: 'outdoor', id: 'outdoor', label: 'Outdoor'},
                ]" group-name="theme-type" emitter-event="mapThemeSelected"/>
        </div>
        <localityComponent></localityComponent>
        <weatherComponent></weatherComponent>
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
        gap: var(--gigantic);
        overflow: scroll;
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

    .menu-theme-row {
        justify-content: center;
    }
</style>