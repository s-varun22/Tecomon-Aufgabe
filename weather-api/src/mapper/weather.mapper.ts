import { WeatherApiResponse } from "../interfaces";
import { Forecast, Location, Weather, WeatherResult } from "../types";

export function mapWeatherResponse(
	data: WeatherApiResponse,
	location: Location
): WeatherResult {
	const forecast: Forecast = {
		maximum: new Map(
			data.daily.time.map((date, index) => [
				date,
				Math.round(data.daily.temperature_2m_max[index]),
			])
		),
		minimum: new Map(
			data.daily.time.map((date, index) => [
				date,
				Math.round(data.daily.temperature_2m_min[index]),
			])
		),
	};
	const weather: Weather = {
		currentTemperature: Math.round(data.current.temperature_2m),
		unit: data.current_units.temperature_2m,
		isDay: data.current.is_day === 1,
		forecast: forecast,
	};

	return { location, weather };
}
