<script lang="js">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
                currentZoomPercentage: 0.0,
            }
        },
        props: {
        },
        mounted() {
            this.emitter.on('zoomChanged', (zoomPercentage) => {
                this.currentZoomPercentage = zoomPercentage;
            });
        },
        methods: {
        },
    });
</script>

<template>
    <div class="zoom-visualizer-container">
        <div class="zoom-visualizer">
            <div class="zoom-levels">
                <div class="first-zone"></div>
                <div class="second-zone"></div>
                <div class="third-zone"></div>
                <div class="fourth-zone"></div>
                <div class="fifth-zone"></div>
            </div>
            <div class="current-zoom"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $width: 90%;

    .zoom-visualizer-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc($width - 2 * var(--huge));
        margin-left: var(--huge);
        margin-right: var(--huge);
    }

    .zoom-visualizer {
        width: $width;
        display: inline;
        border-radius: 100px;
        background-color: var(--neutral-000);
    }

    .current-zoom {
        width: calc(v-bind('currentZoomPercentage') * 100%);
        max-width: 100%;
        height: var(--micro);
        background-color: var(--neutral-080);
        border: 0.2rem solid var(--neutral-000);
        border-radius: 100px;
    }

    .zoom-levels {
        position: absolute;
        width: calc($width - 2 * var(--huge));
        height: var(--micro);
        display: flex;
    }

    .first-zone, .second-zone, .third-zone, .fourth-zone, .fifth-zone {
        height: var(--micro);
        border-radius: 0;
        border: 0 solid var(--neutral-000);
    }

    .first-zone {
        width: calc(1/8 * $width);
        border-radius: 100px 0 0 100px;
    }

    .second-zone {
        width: calc(1/4 * $width);
        border-width: 0 3px;
    }

    .third-zone {
        width: calc(1/4 * $width);
    }

    .fourth-zone {
        width: calc(1/8 * $width);
        border-width:  0 3px;
    }

    .fifth-zone {
        width: calc(1/4 * $width);
        border-radius: 0 100px 100px 0;
    }
</style>