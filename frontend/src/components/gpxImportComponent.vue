<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
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
            triggerInput() {
                const gpxInput = this.$refs.gpxInput as HTMLInputElement;
                gpxInput.click();
            },
            handleFileChange(event: Event) {
                const input = event.target as HTMLInputElement;
                if (input.files && input.files.length > 0) {
                    const file = input.files[0];
                    this.readFile(file);
                }
            },
            readFile(file: File) {
                const reader = new FileReader();
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    const fileContent = event.target?.result;
                    if (fileContent) {
                        const geoJson = this.parseGpx(fileContent);
                        this.emitter.emit('gpxImported', geoJson);
                    }
                };
                reader.readAsText(file);
            },
            parseGpx(gpxContent: string) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(gpxContent, "application/xml");

                const geoJson = {
                    type: "FeatureCollection",
                    features: []
                };
                // Waypoints (wpt)
                const waypoints = xmlDoc.getElementsByTagName("wpt");
                for (let i = 0; i < waypoints.length; i++) {
                    const wpt = waypoints[i];
                    const lat = parseFloat(wpt.getAttribute("lat") || "0");
                    const lon = parseFloat(wpt.getAttribute("lon") || "0");
                    const ele = parseFloat(wpt.getElementsByTagName("ele")[0]?.textContent || "0");
                    geoJson.features.push({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [lon, lat]
                        },
                        properties: {
                            gpx_type: "wpt",
                            name: wpt.getElementsByTagName("name")[0]?.textContent || "",
                            description: wpt.getElementsByTagName("desc")[0]?.textContent || "",
                            elevation: ele
                        }
                    });
                }
                // Tracks (trk)
                const tracks = xmlDoc.getElementsByTagName("trk");
                for (let i = 0; i < tracks.length; i++) {
                    const trk = tracks[i];
                    const trksegs = trk.getElementsByTagName("trkseg");
                    for (let j = 0; j < trksegs.length; j++) {
                        const trkseg = trksegs[j];
                        const trkpts = trkseg.getElementsByTagName("trkpt");
                        const coordinates = [];
                        for (let k = 0; k < trkpts.length; k++) {
                            const trkpt = trkpts[k];
                            const lat = parseFloat(trkpt.getAttribute("lat") || "0");
                            const lon = parseFloat(trkpt.getAttribute("lon") || "0");
                            coordinates.push([lon, lat]);
                        }
                        geoJson.features.push({
                            type: "Feature",
                            geometry: {
                                type: "LineString",
                                coordinates: coordinates
                            },
                            properties: {
                                gpx_type: "trkseg",
                                name: trk.getElementsByTagName("name")[0]?.textContent || "",
                                description: trk.getElementsByTagName("desc")[0]?.textContent || ""
                            }
                        });
                    }
                }
                return geoJson;
            }
        },
    });
</script>

<template>
    <span class="material-symbols-outlined" @click="triggerInput">add_circle</span>
    <input type="file" id="gpx-selector" ref="gpxInput" accept=".gpx" @change="handleFileChange">
</template>

<style lang="scss" scoped>
    #gpx-selector {
        display: none;
    }
</style>