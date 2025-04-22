<script lang="ts">
    import {defineComponent} from "vue";
    import * as Plot from "@observablehq/plot";
    import {WeatherData} from "../../model/WeatherData"

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
            const element = document.getElementById("sunlight-chart");
            element?.append(this.plot);

            this.emitter.on("weatherUpdateCompleted", (weatherData: WeatherData) => {
                this.drawChart(weatherData);
            })
        },
        methods: {
            drawChart(weatherData: WeatherData) {
                const element = document.getElementById("sunlight-chart");
                element?.removeChild(this.plot);
                this.plot = Plot.plot({
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
                            label: null,
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
                        Plot.ruleY([0], {
                            stroke: "#333333",
                            strokeWidth: 4,
                        }),
                        Plot.differenceY({length: weatherData.hourly.time.length}, {
                            curve: "basis",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.isDay.map(d => d),
                            z: null,
                            positiveFill: "#999999",
                            negativeFill: "#1a1a1a",
                            stroke: "#333333",
                            strokeWidth: 2,
                            strokeOpacity: 1,
                        }),
                        Plot.areaY({length: weatherData.hourly.time.length}, {
                            curve: "basis",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.diffuseRadiation.map(d => d),
                            z: null,
                            fill: "#c66e02",
                            stroke: "#df7c02",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.areaY({length: weatherData.hourly.time.length}, {
                            curve: "basis",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.directRadiation.map(d => d),
                            z: null,
                            fill: "#f98a02",
                            stroke: "#fda131",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.text(weatherData.daily, {
                            x: "sunrise",
                            y: 0,
                        })
                    ]
                });
                element?.append(this.plot);
            }
        },
    });
</script>

<template>
    <div class="widget-container">
        <div class="chart-header"><p>Sun radiation</p><p class="mono">W/m²</p></div>
        <div id="sunlight-chart"></div>
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

    #sunlight-chart {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        background-color: var(--neutral-000);
    }
</style>