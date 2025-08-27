import { Location } from "./location.type";

export type Weather = {
	currentTemperature: number;
	unit: string;
	isDay: boolean;
	forecast: Forecast;
};

export type Forecast = {
	maximum: Map<string, number>;
	minimum: Map<string, number>;
};

export type WeatherResult = {
	location: Location;
	weather: Weather;
};
