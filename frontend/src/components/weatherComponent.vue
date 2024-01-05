<script lang="ts">
    import {defineComponent} from "vue";
    import {fetchWeatherApi} from "openmeteo";
    import temperatureWidget from "./widgets/temperatureWidget.vue"
    import windWidget from "./widgets/windWidget.vue";
    import soilMoistureWidget from "./widgets/soilMoistureWidget.vue";
    import sunlightWidget from "./widgets/sunlightWidget.vue";
    import axios from "axios";

    const url = "https://api.open-meteo.com/v1/forecast";

    const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    export default defineComponent({
        components: { temperatureWidget, windWidget, soilMoistureWidget, sunlightWidget },
        data() {
            return {
                locality: "",
                params: {
	                "latitude": 0.0,
	                "longitude": 0.0,
                    "minutely_15": "is_day",
                    "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation_probability", "precipitation", "wind_speed_10m", "wind_speed_80m", "wind_speed_120m", "wind_speed_180m", "wind_direction_10m", "wind_direction_80m", "wind_direction_120m", "wind_direction_180m", "temperature_80m", "temperature_120m", "temperature_180m", "soil_moisture_0_to_1cm", "soil_moisture_1_to_3cm", "soil_moisture_3_to_9cm", "soil_moisture_9_to_27cm", "is_day", "direct_radiation", "diffuse_radiation"],
	                "daily": ["sunrise", "sunset"],
	                "wind_speed_unit": "ms",
	                "timezone": "GMT",
	                "forecast_days": 2
                },
            }
        },
        props: {
        },
        mounted() {
            this.updateWeather();

            this.emitter.on('updateWeather', () => {
                this.updateWeather();
            });

            this.emitter.on('localitySearched', (locality: String) => {
                this.locality = String(locality);
                this.updateWeather();
            });
        },
        methods: {
            updateWeather() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        if (this.locality !== "") {
                            axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${this.locality}&count=1&format=json`).then(response => {
                                console.log(response);
                            });
                        } else {
                            this.params.latitude = position.coords.latitude;
                            this.params.longitude = position.coords.longitude;
                        }

                        let responses = await fetchWeatherApi(url, this.params);
                        const response = responses[0];
                        const utcOffsetSeconds = response.utcOffsetSeconds();
                        // const timezone = response.timezone();
                        // const timezoneAbbreviation = response.timezoneAbbreviation();

                        const hourly = response.hourly()!;
                        const daily = response.daily()!;

                        let weatherData = {
                            hourly: {
                                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                                ),
                                temperature2m: hourly.variables(0)!.valuesArray()!,
                                relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
                                apparentTemperature: hourly.variables(2)!.valuesArray()!,
                                precipitationProbability: hourly.variables(3)!.valuesArray()!,
                                precipitation: hourly.variables(4)!.valuesArray()!,
                                windSpeed10m: hourly.variables(5)!.valuesArray()!,
                                windSpeed80m: hourly.variables(6)!.valuesArray()!,
                                windSpeed120m: hourly.variables(7)!.valuesArray()!,
                                windSpeed180m: hourly.variables(8)!.valuesArray()!,
                                windDirection10m: hourly.variables(9)!.valuesArray()!,
                                windDirection80m: hourly.variables(10)!.valuesArray()!,
                                windDirection120m: hourly.variables(11)!.valuesArray()!,
                                windDirection180m: hourly.variables(12)!.valuesArray()!,
                                temperature80m: hourly.variables(13)!.valuesArray()!,
                                temperature120m: hourly.variables(14)!.valuesArray()!,
                                temperature180m: hourly.variables(15)!.valuesArray()!,
                                soilMoisture0To1cm: hourly.variables(16)!.valuesArray()!,
                                soilMoisture1To3cm: hourly.variables(17)!.valuesArray()!,
                                soilMoisture3To9cm: hourly.variables(18)!.valuesArray()!,
                                soilMoisture9To27cm: hourly.variables(19)!.valuesArray()!,
                                isDay: hourly.variables(20)!.valuesArray()!,
                                directRadiation: hourly.variables(21)!.valuesArray()!,
                                diffuseRadiation: hourly.variables(22)!.valuesArray()!,
                            },
                            daily: {
                                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                                ),
                                sunrise: daily.variables(0)!.valuesArray()!,
		                        sunset: daily.variables(1)!.valuesArray()!,
	                        },
                        }
                        console.log(weatherData);
                        this.emitter.emit('weatherUpdateCompleted', weatherData);
                    });
                }
            }
        },
    });
</script>

<template>
    <div class="weather-container">
        <temperatureWidget></temperatureWidget>
        <windWidget></windWidget>
        <soilMoistureWidget></soilMoistureWidget>
        <sunlightWidget></sunlightWidget>
        <p class="mono">lat: {{this.params.latitude}} long: {{this.params.longitude}}</p>
    </div>
</template>

<style lang="scss" scoped>
    .weather-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: var(--large);
    }
</style>