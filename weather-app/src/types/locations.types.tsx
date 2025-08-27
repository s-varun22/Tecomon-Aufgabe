export type Location = {
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	country: string;
};

export type OpenMeteoResponse = {
	name: string;
	admin1: string;
	country: string;
	latitude: number;
	longitude: number;
};
