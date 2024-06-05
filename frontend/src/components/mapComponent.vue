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
                style: 'src/assets/style/map/darkStyle_new.json',
                center: [12.516667, 42.516667],
                zoom: 6,
                minZoom: 2,
                maxZoom: 18,
                attributionControl: false
            });
            map.addControl(new maplibregl.AttributionControl({compact: true, customAttribution: "Maps © Thunderforest, Data © OpenStreetMap contributors"}));

            const userLocationElement = document.createElement('div');
            userLocationElement.className = 'user-location-marker';
            let userLocationMarker = new maplibregl.Marker({element: userLocationElement}).setLngLat([0,0]).addTo(map);

            const trackUserPosition = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(
                        (position) => {
                            map.easeTo({ center:[position.coords.longitude, position.coords.latitude], bearing:position.coords.heading??0, zoom: 14.5 });
                            userLocationMarker.setLngLat([position.coords.longitude, position.coords.latitude]);
                            userLocationMarker.setRotation(position.coords.heading??0);
                            console.log(position);
                        },
                        (error) => {
                            console.error(`Error getting user location: ${error.code}`);
                        },
                        {
                            enableHighAccuracy: true,
                            maximumAge: 0,
                            timeout: 5000
                        }
                    );
                } else {
                    console.error('Geolocation is not supported by this browser.');
                }
            };

            map.on('load', () => {
                trackUserPosition();
                this.emitter.emit("zoomChanged", (map.getZoom() - map.getMinZoom()) / (map.getMaxZoom() - map.getMinZoom()));
            });

            map.on('zoom', () => {
                this.emitter.emit("zoomChanged", (map.getZoom() - map.getMinZoom()) / (map.getMaxZoom() - map.getMinZoom()));
            });

            let currentView = 0;
            this.emitter.on("changeMapView", () => {
                currentView = (currentView + 1) % 3;
                switch (currentView) {
                    case 0:
                        map.easeTo({ bearing: 0, pitch: 0, zoom: 14.5 });
                        break;
                    case 1:
                        map.easeTo({ pitch: 0, zoom: 14.5 });
                        break;
                    case 2:
                        map.easeTo({ pitch: 45, zoom: 14.5 });
                        break;
                }
            });

            this.emitter.on("satelliteButtonClicked", () => {
                trackUserPosition();
            });

            this.emitter.on("mapThemeSelected", (themeName) => {
                switch (themeName) {
                    case "dark":
                        map.setStyle('src/assets/style/map/darkStyle_new.json');
                        break;
                    case "outdoor":
                        map.setStyle('src/assets/style/map/outdoorStyle.json');
                        break;
                    default:
                }
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

    .user-location-marker {
        width: 32px;
        height: 32px;
        background-image: url('../assets/icons/navigation.svg');
        animation: glow 2s infinite alternate;
        animation-timing-function: ease-in-out;
    }

    @keyframes glow {
    0% {
        filter: drop-shadow(0 0 0px hsl(33, 98%, 59%));
    }
    50% {
        filter: drop-shadow(0 0 3px hsl(33, 98%, 79%));
    }
    100% {
        filter: drop-shadow(0 0 0px hsl(33, 98%, 59%));
    }
}
</style>