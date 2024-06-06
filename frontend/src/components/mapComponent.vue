<script lang="ts">
    import {defineComponent} from "vue";
    import maplibregl from "maplibre-gl";

    export default defineComponent({
        data() {
            return {
            }
        },
        mounted() {
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
                        map.easeTo({ pitch: 45, zoom: 16 });
                        break;
                }
            });

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
            let userLocationMarker = new maplibregl.Marker({element: userLocationElement, pitchAlignment: 'map', rotationAlignment: 'viewport'}).setLngLat([0,0]).addTo(map);
            let userPosition = { latitude: 0, longitude: 0, heading: 0};

            function moveUserLocationMarker() {
                const start = { lng: userLocationMarker.getLngLat().lng, lat: userLocationMarker.getLngLat().lat, heading: userLocationMarker.getRotation() };
                const end = { lng: userPosition.longitude, lat: userPosition.latitude, heading: userPosition.heading };
                const duration = 500;
                let startTime: number = 0;
                function step(timestamp: number) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    const currentLng = start.lng + (end.lng - start.lng) * progress;
                    const currentLat = start.lat + (end.lat - start.lat) * progress;
                    const currentHeading = start.heading + (end.heading - start.heading) * progress;
                    userLocationMarker.setLngLat([currentLng, currentLat]);
                    userLocationMarker.setRotation(currentHeading);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }
                requestAnimationFrame(step);
            }

            const trackUserPosition = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(
                        (position) => {
                            if (position.coords.heading != null && position.coords.heading != userPosition.heading) {
                                userPosition.heading = position.coords.heading;
                            }
                            userPosition.latitude = position.coords.latitude;
                            userPosition.longitude = position.coords.longitude;
                            map.flyTo({
                                center:[userPosition.longitude, userPosition.latitude],
                                zoom: currentView == 2 ? 16 : 14.5,
                                bearing: currentView == 0 ? 0 : userPosition.heading??0,
                                padding: {top: 500, bottom:0, left: 0, right: 0},
                                duration: 500
                            });
                            requestAnimationFrame(moveUserLocationMarker);
                            // userLocationMarker.setLngLat([userPosition.longitude, userPosition.latitude]);
                            // userLocationMarker.setRotation(userPosition.heading??0);
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
                    console.error('Geolocation is not supported by this browser');
                }
            };

            map.on('load', () => {
                trackUserPosition();
                this.emitter.emit("zoomChanged", (map.getZoom() - map.getMinZoom()) / (map.getMaxZoom() - map.getMinZoom()));
            });

            map.on('zoom', () => {
                this.emitter.emit("zoomChanged", (map.getZoom() - map.getMinZoom()) / (map.getMaxZoom() - map.getMinZoom()));
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
    }

    .user-location-marker::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url('../assets/icons/navigation.svg');
        animation: ripple 6s cubic-bezier(0.2, 0.5, 0.2, 1) infinite;
    }

    @keyframes ripple {
        0% {
            opacity: 0.5;
            transform: scale(1);
        }
        25% {
            opacity: 0;
            transform: scale(2);
        }
        100% {
            opacity: 0;
        }
    }
</style>