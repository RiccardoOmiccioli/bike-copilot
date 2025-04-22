export interface WeatherData {
    hourly: {
        time: Date[];
        isDay: number[];
        precipitation: number[];
        precipitationProbability: number[];
        apparentTemperature: number[];
        temperature2m: number[];
        temperature80m: number[];
        temperature120m: number[];
        temperature180m: number[];
        windSpeed10m: number[];
        windSpeed80m: number[];
        windSpeed120m: number[];
        windSpeed180m: number[];
        windDirection10m: number[];
        windDirection80m: number[];
        windDirection120m: number[];
        windDirection180m: number[];
        soilMoisture0To1cm: number[];
        soilMoisture1To3cm: number[];
        soilMoisture3To9cm: number[];
        soilMoisture9To27cm: number[];
        directRadiation: number[];
        diffuseRadiation: number[];
    };
    daily: {
        time: Date[];
        sunrise: number[];
        sunset: number[];
    }
}