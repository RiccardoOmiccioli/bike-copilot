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
                container: 'map',
                style: 'src/assets/style/map/mapStyle.json',
                center: [12.516667, 42.516667],
                zoom: 6,
                minZoom: 2,
                maxZoom: 18,
                attributionControl: false
            });
            map.addControl(new maplibregl.AttributionControl({compact: true, customAttribution: "Maps © Thunderforest, Data © OpenStreetMap contributors"}));
            let geolocateControl = new maplibregl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            });
            map.addControl(geolocateControl, 'bottom-right');

            map.on('load', () => {
                geolocateControl.trigger();
                this.emitter.emit("zoomChanged", (map.getZoom() - map.getMinZoom()) / (map.getMaxZoom() - map.getMinZoom()));
            });

            map.on('zoom', () => {
                this.emitter.emit("zoomChanged", (map.getZoom() - map.getMinZoom()) / (map.getMaxZoom() - map.getMinZoom()));
            });

            this.emitter.on("satelliteButtonClicked", () => {
                geolocateControl.trigger();
            });
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

    .maplibregl-ctrl-bottom-right,
    .maplibregl-ctrl-bottom-left {
        display: none;
    }
</style>