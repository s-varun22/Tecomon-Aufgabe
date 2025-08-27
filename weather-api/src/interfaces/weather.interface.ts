// Response object from open-mateo API
export interface WeatherApiResponse {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;

	current_units: CurrentUnits;
	current: ApiCurrentWeather;

	daily_units: DailyUnits;
	daily: DailyWeather;
}

interface CurrentUnits {
	time: string;
	interval: string;
	is_day: string;
	apparent_temperature: string;
	temperature_2m: string;
}

interface ApiCurrentWeather {
	time: string;
	interval: number;
	is_day: number;
	temperature_2m: number;
}

interface DailyUnits {
	time: string;
	temperature_2m_max: string;
	temperature_2m_min: string;
}

interface DailyWeather {
	time: string[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
}
