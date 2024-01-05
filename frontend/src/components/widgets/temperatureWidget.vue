<script lang="ts">
    import {defineComponent} from "vue";
    import * as Plot from "@observablehq/plot";
    import {WeatherData} from "../../model/WeatherData"

    export default defineComponent({
        components: {},
        data() {
            return {
            }
        },
        props: {
        },
        mounted() {
            this.emitter.on("weatherUpdateCompleted", (weatherData: WeatherData) => {
                this.drawChart(weatherData);
            })

        },
        methods: {
            drawChart(weatherData: WeatherData) {
                const plot = Plot.plot({
                    margin: 32,
                    inset: 16,
                    color: {
                        domain: [-10, 30],
                        type: "diverging",
                        scheme: "BuRd"
                    },
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
                            y: weatherData.hourly.temperature180m.map(d => d),
                            z: null,
                            stroke: "#1a1a1a",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.temperature120m.map(d => d),
                            z: null,
                            stroke: "#333333",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.temperature80m.map(d => d),
                            z: null,
                            stroke: "#4d4d4d",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.temperature2m.map(d => d),
                            z: null,
                            stroke: "#666666",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.apparentTemperature.map(d => d),
                            z: null,
                            stroke: "#ffa333",
                            strokeWidth: 4,
                        }),
                    ]
                });
                const element = document.getElementById("temperature-chart");
                element?.append(plot);
            }
        },
    });
</script>

<template>
    <div class="widget-container">
        <div class="chart-header"><p>Temperature</p><p class="mono">°C</p></div>
        <div id="temperature-chart"></div>
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

    #temperature-chart {
        width: 100%;
        background-color: var(--neutral-000);
    }
</style>