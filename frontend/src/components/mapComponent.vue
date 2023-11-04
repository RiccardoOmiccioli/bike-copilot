<script lang="ts">
    import {defineComponent} from "vue";
    import maplibregl from "maplibre-gl";

    export default defineComponent({
        data() {
        return {
        }
        },
        mounted() {
            let map = new maplibregl.Map({
                container: 'map', // container id
                style: 'src/assets/style/map/mapStyle.json', // style URL
                center: [0, 0], // starting position [lng, lat]
                zoom: 1, // starting zoom
                attributionControl: false
            });
            map.addControl(new maplibregl.AttributionControl({compact: true, customAttribution: "Maps © Thunderforest, Data © OpenStreetMap contributors"}));
            map.addControl(
                new maplibregl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                })
            );
        },
        methods: {
        },
    });
</script>

<template>
    <div id="map"></div>
</template>

<style lang="scss">
    .maplibregl-canvas-container {
        width: 100%;
        height: 100%;
    }

    .maplibregl-canvas {
        width: 100% !important;
        height: 100% !important;
    }

</style>