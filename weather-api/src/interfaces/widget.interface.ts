import { Weather } from "../types/weather.type";
import { Location } from "../types/location.type";

export interface Widget {
	id: string;
	location: Location;
	weather: Weather;
	createdAt: string;
}
