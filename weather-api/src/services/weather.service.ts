import { WEATHER_CONFIG } from "../config/weather.config";
import { WeatherApiResponse, Widget } from "../interfaces";
import { AppError, memoryCache } from "../lib";
import { mapWeatherResponse } from "../mapper";
import { Location, WeatherResult } from "../types";

export async function fetchCurrentWeather(
	location: Location
): Promise<WeatherResult & { cached: boolean }> {
	// Build cache key and check memory cache
	const key = `${location.city},${location.country}`;
	const cached = memoryCache.get(key) as Widget | null;
	if (cached) {
		console.log("Cache hit", key);
		return { ...cached, cached: true };
	}

	// Setup query parameters for the weather API
	const params = new URLSearchParams({
		latitude: String(location.latitude),
		longitude: String(location.longitude),
		...WEATHER_CONFIG.DEFAULT_PARAMS,
	});

	// Call the external API and handle network errors
	let resp: Response;
	try {
		resp = await fetch(`${WEATHER_CONFIG.BASE_URL}?${params.toString()}`);
	} catch {
		throw new AppError("Weather service unreachable", 503);
	}

	// Validate response status
	if (!resp.ok) {
		throw new AppError(
			`Weather provider error: ${resp.status} ${resp.statusText}`,
			502
		);
	}

	// Parse the API response
	let data: WeatherApiResponse;
	try {
		data = (await resp.json()) as WeatherApiResponse;
	} catch {
		throw new AppError("Invalid weather response", 502);
	}

	// Map the API response into internal format
	const response = mapWeatherResponse(data, location);

	// Cache the response for future calls
	memoryCache.set(key, response, WEATHER_CONFIG.CACHE_TTL_MS);
	console.log("Cache miss", key);

	return { ...response, cached: false };
}
