<script lang="js">
    import {defineComponent} from "vue";
    import * as Plot from "@observablehq/plot";

    export default defineComponent({
        components: {},
        data() {
            return {
                plot: Plot.plot(),
            }
        },
        props: {
        },
        mounted() {
            const element = document.getElementById("wind-chart");
            element?.append(this.plot);

            this.emitter.on("weatherUpdateCompleted", (weatherData) => {
                this.drawChart(weatherData);
            })
        },
        methods: {
            drawChart(weatherData) {
                const element = document.getElementById("wind-chart");
                element?.removeChild(this.plot);
                this.plot = Plot.plot({
                    margin: 32,
                    inset: 16,
                    style: {fontSize: "16px"},
                    x: {
                        type: "time",
                    },
                    y: {
                        type: "linear",
                    },
                    marks: [
                        Plot.axisX({
                            color: "#666666",
                            label: null,
                            tickFormat: (t) => {
                                return new Date(t).getHours();
                            }
                        }),
                        Plot.axisY({
                            color: "#666666",
                            label: null
                        }),
                        Plot.gridY({
                            stroke: "#666666",
                            strokeWidth: 2,
                        }),
                        Plot.ruleX([new Date()], {
                            stroke: "#333333",
                            strokeWidth: 4,
                            strokeDasharray: "4,4",
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.windSpeed180m.map(d => d),
                            z: null,
                            stroke: "#00223d",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.windSpeed120m.map(d => d),
                            z: null,
                            stroke: "#003e70",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.windSpeed80m.map(d => d),
                            z: null,
                            stroke: "#005aa3",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.windSpeed10m.map(d => d),
                            z: null,
                            stroke: "#0078d7",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.vector({length: weatherData.hourly.time.length}, {
                            x: weatherData.hourly.time.map(d => d.getHours()%2 === 0 ? d : null),
                            frameAnchor: "top",
                            dy: -16,
                            length: 16,
                            rotate: weatherData.hourly.windDirection10m.map(d => d),
                            stroke: "#0078d7",
                            strokeWidth: 2,
                            strokeOpacity: 1,
                        }),
                    ]
                });
                element?.append(this.plot);
            }
        },
    });
</script>

<template>
    <div class="widget-container">
        <div class="chart-header"><p>Wind</p><p class="mono">m/s</p></div>
        <div id="wind-chart"></div>
    </div>
</template>

<style lang="scss" scoped>
    p {
        align-self: flex-start;
    }

    .widget-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
    }

    .chart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    #wind-chart {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        background-color: var(--neutral-000);
    }
</style>