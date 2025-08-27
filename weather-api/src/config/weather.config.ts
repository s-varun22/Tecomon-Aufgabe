export const WEATHER_CONFIG = {
	BASE_URL:
		process.env.WEATHER_BASE_URL || "https://api.open-meteo.com/v1/forecast",
	CACHE_TTL_MS: Number(process.env.WEATHER_CACHE_TTL) || 5 * 60 * 1000, // default 5 min
	DEFAULT_PARAMS: {
		daily: process.env.WEATHER_DAILY || "temperature_2m_max,temperature_2m_min",
		current:
			process.env.WEATHER_CURRENT ||
			"is_day,apparent_temperature,temperature_2m",
		timezone: process.env.WEATHER_TIMEZONE || "Europe/Berlin",
	},
};
