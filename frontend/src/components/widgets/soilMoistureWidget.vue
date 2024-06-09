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
            const element = document.getElementById("soil-moisture-chart");
            element?.append(this.plot);

            this.emitter.on("weatherUpdateCompleted", (weatherData: WeatherData) => {
                this.drawChart(weatherData);
            })
        },
        methods: {
            drawChart(weatherData: WeatherData) {
                const element = document.getElementById("soil-moisture-chart");
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
                        percent: true,
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
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.soilMoisture9To27cm.map(d => d),
                            z: null,
                            stroke: "#00223d",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.soilMoisture3To9cm.map(d => d),
                            z: null,
                            stroke: "#003e70",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.soilMoisture1To3cm.map(d => d),
                            z: null,
                            stroke: "#005aa3",
                            strokeWidth: 4,
                            strokeOpacity: 1,
                        }),
                        Plot.line({length: weatherData.hourly.time.length}, {
                            curve: "cardinal",
                            x: weatherData.hourly.time.map(d => d),
                            y: weatherData.hourly.soilMoisture0To1cm.map(d => d),
                            z: null,
                            stroke: "#0078d7",
                            strokeWidth: 4,
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
        <div class="chart-header"><p>Soil moisture</p><p class="mono">%</p></div>
        <div id="soil-moisture-chart"></div>
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

    #soil-moisture-chart {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        background-color: var(--neutral-000);
    }
</style>