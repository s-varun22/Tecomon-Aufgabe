import { Location } from "@/types/locations.types";
import { Weather } from "@/types/weather.types";

export type Widget = {
	id: string;
	location: Location;
	weather: Weather;
	createdAt: string;
};
