<script lang="ts">
    import {defineComponent, watch} from "vue";
    import Chart from "chart.js/auto"

    export default defineComponent({
        components: {},
        data() {
            return {
            }
        },
        props: {
        },
        mounted() {
            this.emitter.on("weatherUpdateCompleted", (weatherData) => {
                this.drawChart(weatherData);
            })

        },
        methods: {
            drawChart(weatherData) {
                const windChartCanvas = this.$refs.windChart as HTMLCanvasElement;
                const timeOptions = { hour: "2-digit", hour12: false };

                new Chart(windChartCanvas, {
                    type: "line",
                    data: {
                        labels: weatherData.hourly.time.map((time) => time.toLocaleTimeString("it-IT", timeOptions)),
                        datasets: [
                            {
                                data: weatherData.hourly.windSpeed10m,
                                borderColor: "rgba(0, 120, 215, 1)",
                                borderWidth: 1,
                                fill: false,
                                pointStyle: false,
                                tension: 0.4
                            },
                            {
                                data: weatherData.hourly.windSpeed80m,
                                borderColor: "rgba(0, 120, 215, 0.75)",
                                borderWidth: 1,
                                fill: false,
                                pointStyle: false,
                                tension: 0.4
                            },
                            {
                                data: weatherData.hourly.windSpeed120m,
                                borderColor: "rgba(0, 120, 215, 0.5)",
                                borderWidth: 1,
                                fill: false,
                                pointStyle: false,
                                tension: 0.4
                            },
                            {
                                data: weatherData.hourly.windSpeed180m,
                                borderColor: "rgba(0, 120, 215, 0.25)",
                                borderWidth: 1,
                                fill: false,
                                pointStyle: false,
                                tension: 0.4
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    color: 'rgb(255, 99, 132)'
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    maxTicksLimit: 24,
                                    padding: 1,
                                    color: "rgba(204, 204, 204, 0.25)",
                                },
                            },
                            y: {
                                ticks: {
                                    stepSize: 1,
                                    padding: 1,
                                    color: "rgba(204, 204, 204, 0.25)",
                                },
                            },
                        },
                    }
                });

            }
        },
    });
</script>

<template>
    <div class="widget-container">
        <p>Wind</p>
        <canvas ref="windChart"></canvas>
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
</style>