export type Weather = {
	currentTemperature: number;
	unit: string;
	isDay: boolean;
	forecast: Forecast;
};

type Forecast = {
	maximum: Record<string, number>;
	minimum: Record<string, number>;
};
